from fastapi.testclient import TestClient
from unittest import TestCase
from sqlmodel import SQLModel
from api.index import app
from api.utils import engine

client = TestClient(app)

class TestAPI(TestCase):
    def setUp(self):
        SQLModel.metadata.drop_all(engine)
        SQLModel.metadata.create_all(engine)


    def test_api(self):
        response = client.post("/api/leads/", json={
            "name": "Steve Jobs",
            "email": "sj@apple.com",
            "company": "Apple",
        })
        assert response.status_code == 201

        response = client.post("/api/leads/", json={
            "name": "Bill Gates",
            "email": "bg@microsoft.com",
            "company": "Microsoft",
        })
        assert response.status_code == 201

        response = client.get("/api/leads/")
        assert response.status_code == 200
        assert len(response.json()["leads"]) == 2
        # default sort order is descending by created_at
        assert response.json()["leads"][0]["name"] == "Bill Gates"
        assert response.json()["leads"][1]["name"] == "Steve Jobs"

        response = client.patch("/api/leads/1", json={
            "stage": 1,
            "engaged": True,
            "last_contacted": "2021-02-01",
        })
        assert response.status_code == 200
        response = client.patch("/api/leads/2", json={
            "stage": 2,
            "engaged": False,
            "last_contacted": "2021-01-01",
        })

        response = client.get("/api/leads/?sort_by=stage&sort_order=asc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Steve Jobs"
        assert response.json()["leads"][1]["name"] == "Bill Gates"

        response = client.get("/api/leads/?sort_by=stage&sort_order=desc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Bill Gates"
        assert response.json()["leads"][1]["name"] == "Steve Jobs"

        response = client.get("/api/leads/?sort_by=last_contacted&sort_order=asc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Bill Gates"
        assert response.json()["leads"][1]["name"] == "Steve Jobs"

        response = client.get("/api/leads/?sort_by=last_contacted&sort_order=desc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Steve Jobs"
        assert response.json()["leads"][1]["name"] == "Bill Gates"

        response = client.patch("/api/leads/1", json={
            "stage": 2,
            "engaged": True,
            "last_contacted": "2021-03-01",
        })
        response = client.get("/api/leads/?sort_by=stage&sort_order=asc&secondary_sort_by=last_contacted&secondary_sort_order=asc")
        assert response.status_code == 200
        assert response.json()["leads"][0]["name"] == "Bill Gates"
        assert response.json()["leads"][1]["name"] == "Steve Jobs"

        response = client.delete("/api/leads/1")
        assert response.status_code == 204

        response = client.get("/api/leads/")
        assert response.status_code == 200
        assert len(response.json()["leads"]) == 1
        assert response.json()["leads"][0]["name"] == "Bill Gates"




        

