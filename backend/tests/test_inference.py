import pytest
from app import app

@pytest.fixture()
def client():
    return app.test_client()


def test_standard(client):
    with open('./assets/test.png', 'rb') as file:
        response = client.post('/inference', data={'image': (file, 'image.jpg')})
    
    result = response.json['data']
    
    assert result == [ 
        [8, 0, 0, 0, 1, 0, 0, 0, 9],
        [0, 5, 0, 8, 0, 7, 0, 1, 0],
        [0, 0, 4, 0, 9, 0, 7, 0, 0],
        [0, 6, 0, 7, 0, 1, 0, 2, 0],
        [5, 0, 8, 0, 6, 0, 1, 0, 7],
        [0, 1, 0, 5, 0, 2, 0, 9, 0],
        [0, 0, 7, 0, 4, 0, 6, 0, 0],
        [0, 8, 0, 3, 0, 9, 0, 4, 0],
        [3, 0, 0, 0, 5, 0, 0, 0, 8]
    ]

def test_nopuzzle(client):
    with open('./assets/capybara.jpg', 'rb') as file:
        response = client.post('/inference', data={'image': (file, 'image.jpg')})
    
    assert response.status_code == 400