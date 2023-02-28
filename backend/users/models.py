from django.db import models
from django.contrib.auth.models import User
from companies.models import Supplier_Company, Customers_Company





class Profile(models.Model):
    
    # Supplier_company_id = models.ForeignKey(Supplier_Company, null=True, on_delete=models.CASCADE, default = None)
    # Customers_company_id = models.ForeignKey(Customers_Company, null=True, on_delete=models.CASCADE, default = None)
    is_email_verified = models.BooleanField(default=False)
    profile_owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

     

