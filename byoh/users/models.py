from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class MyUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, city, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not first_name:
            raise ValueError("Users must provide a first name")
        if not last_name:
            raise ValueError("Users must provide a last name")
        if not city:
            raise ValueError("Users must provide a nearby city")
        
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            city=city
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, city, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            first_name=first_name,
            last_name=last_name,
            city=city
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user




class User(AbstractBaseUser):
    email           = models.EmailField(verbose_name="email", max_length=60, unique=True)
    date_joined     = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login      = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)

    first_name      = models.CharField(max_length=30)
    last_name       = models.CharField(max_length=30)
    weight          = models.PositiveSmallIntegerField(default=75)
    dob             = models.DateField(null=True, verbose_name="date of birth")
    city            = models.CharField(max_length=40)



    chest           = models.DecimalField(max_digits=4, decimal_places=2, default=1)
    back            = models.DecimalField(max_digits=4, decimal_places=2, default=1)
    arms            = models.DecimalField(max_digits=4, decimal_places=2, default=1)
    core            = models.DecimalField(max_digits=4, decimal_places=2, default=1)
    legs            = models.DecimalField(max_digits=4, decimal_places=2, default=1)
    stamina         = models.DecimalField(max_digits=4, decimal_places=2, default=1)
    agility         = models.DecimalField(max_digits=4, decimal_places=2, default=1)
    speed           = models.DecimalField(max_digits=4, decimal_places=2, default=1)

    sort_by         = models.BooleanField(default=True)
#    active_quest    = models.
#    pursuing
    measurement     = models.BooleanField(default=True)
    privacy1        = models.PositiveSmallIntegerField(default=1)
    privacy2        = models.PositiveSmallIntegerField(default=1)

#   friends list
#   feed


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['first_name', 'last_name', 'city']

    objects = MyUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

