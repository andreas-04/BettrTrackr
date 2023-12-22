"""
This file, 'tests.py', contains the test cases for the CustomUser model in the Django application.

It includes a single test case class, 'CustomUserModelTest', which inherits from Django's TestCase class. 
This class is used to create a test database that is isolated from the main database. This ensures that the 
tests do not affect the main database.

The 'setUpTestData' class method is used to set up the database state for the test case. In this case, it creates 
a single CustomUser instance with a username of 'testuser' and a password of 'testpassword'.

The 'test_username_label' method is a single test that checks the verbose name of the 'username' field in the 
CustomUser model. The verbose name is a human-readable name for the field, which is used in Django's automatically 
generated admin site. The test asserts that the verbose name of the 'username' field is 'username'.

This file is a crucial part of the application's test suite, ensuring that the CustomUser model behaves as expected.
"""
# Import the TestCase class from django.test module
from django.test import TestCase

# Import the CustomUser model from the current directory's models module
from .models import CustomUser

# Define a test case for the CustomUser model
class CustomUserModelTest(TestCase):
    
    # Define a class method that sets up test data
    @classmethod
    def setUpTestData(cls):
        # Create a CustomUser instance with username 'testuser' and password 'testpassword'
        CustomUser.objects.create(username='testuser', password='testpassword')

    # Define a test method for the username label
    def test_username_label(self):
        # Get the CustomUser instance with id 1
        user = CustomUser.objects.get(id=1)
        
        # Get the verbose name of the 'username' field of the CustomUser model
        field_label = user._meta.get_field('username').verbose_name
        
        # Assert that the verbose name of the 'username' field is 'username'
        self.assertEqual(field_label, 'username')