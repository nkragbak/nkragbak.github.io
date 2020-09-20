from django.db import models
""" 
Lot of logic is still required before implementation;
- Lvl. I - X ?
- How does the individual exercise item influence stats?
- how does the model interact with {{request.user.weight}}?
- 


class exercise_item():

    BODYWEIGHT = 'BW'
    WEIGHTS    = 'WE'
    HOUSEHOLD  = 'HE'
    SPECIAL    = 'SE'
    EQUIPMENT_CHOICES = [
        (BODYWEIGHT, 'Bodyweight'),
        (WEIGHTS, 'Weights'),
        (HOUSEHOLD, 'Household Equipment'),
        (SPECIAL, 'Misc. Equipment')
    ]

    CHEST      = 'CH'
    BACK       = 'B'
    ARMS       = 'AR'
    CORE       = 'CO'
    LEGS       = 'L'
    STAMINA    = 'ST'
    AGILITY    = 'AG'
    SPEED      = 'SP'
    CATEGORY_CHOICES = [
        (CHEST, 'Chest'),
        (BACK, 'Back'),
        (ARMS, 'Arms'),
        (CORE, 'Core'),
        (LEGS, 'Legs'),
        (STAMINA, 'Stamina'),
        (AGILITY, 'Agility'),
        (SPEED, 'Speed')
    ]

    name_of_exercise    = models.CharField(max_length=40)
    equip_category      = models.CharField(max_length=2, choices=EQUIPMENT_CHOICES, default=BODYWEIGHT) 
    category            = models.CharField(max_length=2, choices=CATEGORY_CHOICES, default=CHEST)
    description         = models.TextField(max_length=300)

"""