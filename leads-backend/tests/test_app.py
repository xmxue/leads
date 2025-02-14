from fastapi.testclient import TestClient
from unittest import TestCase
from sqlmodel import SQLModel, create_engine
from app.main import app
from app.db import engine

client = TestClient(app)


class TestApp(TestCase):
    def setUp(self):
        SQLModel.metadata.drop_all(engine)
        SQLModel.metadata.create_all(engine)


    def test_app(self):
        response = client.post("/leads/", json={
            "name": "Steve Jobs",
            "email": "sj@apple.com",
            "company": "Apple",
        })
        assert response.status_code == 201

        response = client.post("/leads/", json={
            "name": "Bill Gates",
            "email": "bg@microsoft.com",
            "company": "Microsoft",
        })
        assert response.status_code == 201

        response = client.get("/leads/")
        assert response.status_code == 200
        assert len(response.json()["leads"]) == 2
        # default sort order is descending by created_at
        assert response.json()["leads"][0]["name"] == "Bill Gates"
        assert response.json()["leads"][1]["name"] == "Steve Jobs"

        response = client.patch("/leads/1", json={
            "stage": 1,
            "engaged": True,
            "last_contacted": "2021-02-01",
        })
        assert response.status_code == 200
        response = client.patch("/leads/2", json={
            "stage": 2,
            "engaged": False,
            "last_contacted": "2021-01-01",
        })

        response = client.get("/leads/?sort_by=stage&sort_order=asc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Steve Jobs"
        assert response.json()["leads"][1]["name"] == "Bill Gates"

        response = client.get("/leads/?sort_by=stage&sort_order=desc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Bill Gates"
        assert response.json()["leads"][1]["name"] == "Steve Jobs"

        response = client.get("/leads/?sort_by=last_contacted&sort_order=asc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Bill Gates"
        assert response.json()["leads"][1]["name"] == "Steve Jobs"

        response = client.get("/leads/?sort_by=last_contacted&sort_order=desc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Steve Jobs"
        assert response.json()["leads"][1]["name"] == "Bill Gates"

        response = client.patch("/leads/1", json={
            "stage": 2,
            "engaged": True,
            "last_contacted": "2021-03-01",
        })
        response = client.get("/leads/?sort_by=stage&sort_order=asc&secondary_sort_by=last_contacted&secondary_sort_order=asc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Bill Gates"
        assert response.json()["leads"][1]["name"] == "Steve Jobs"

        response = client.delete("/leads/1")
        assert response.status_code == 204

        response = client.get("/leads/")
        assert response.status_code == 200
        assert len(response.json()["leads"]) == 1
        assert response.json()["leads"][0]["name"] == "Bill Gates"




        

