import pytest
import numpy as np
from app import app

@pytest.fixture()
def client():
    return app.test_client()


def test_standard(client):
    with open('./assets/test.png', 'rb') as file:
        response = client.post('/inference', data={'image': (file, 'image.jpg')})
    
    assert response.status_code == 200

    result = np.array(response.json['data'])
    
    assert result.shape == (9, 9)
    assert np.min(result) >= 0 and np.max(result) <= 9

def test_nopuzzle(client):
    with open('./assets/capybara.jpg', 'rb') as file:
        response = client.post('/inference', data={'image': (file, 'image.jpg')})
    
    assert response.status_code == 400