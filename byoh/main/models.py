from django.db import models

#Lot of logic is still required before implementation;
#- Lvl. I - X ?
#- How does the individual exercise item influence stats?
#- how does the model interact with {{request.user.weight}}?
 


class exercise_item(models.Model):

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
    NIL        = 'NO'
    FOCUS_CHOICES = [
        (CHEST, 'Chest'),
        (BACK, 'Back'),
        (ARMS, 'Arms'),
        (CORE, 'Core'),
        (LEGS, 'Legs'),
        (STAMINA, 'Stamina'),
        (AGILITY, 'Agility'),
        (SPEED, 'Speed'),
        (NIL, '------')
    ]

    name                = models.CharField(max_length=40)
    equipment_category  = models.CharField(max_length=2, choices=EQUIPMENT_CHOICES, default=BODYWEIGHT) 
    primary_focus       = models.CharField(max_length=2, choices=FOCUS_CHOICES, default=CHEST)
    secondary_focus     = models.CharField(max_length=2, choices=FOCUS_CHOICES, default=NIL)
    description         = models.TextField(max_length=500)
    tooltip_illustration = models.FilePathField(path="main/static/main/images/tooltip illustrations", default="arms.png")
    friend_verified     = models.BooleanField(default=False)
    video_verified      = models.BooleanField(default=False)
    date_added          = models.DateTimeField(verbose_name="date added", auto_now_add=True)


    level_1             = models.CharField(max_length=30, default="6 reps")
    level_2             = models.CharField(max_length=30, default="6 reps")
    level_3             = models.CharField(max_length=30, default="6 reps")
    level_4             = models.CharField(max_length=30, default="6 reps")
    level_5             = models.CharField(max_length=30, default="6 reps")
    level_6             = models.CharField(max_length=30, default="6 reps")
    level_7             = models.CharField(max_length=30, default="6 reps")
    level_8             = models.CharField(max_length=30, default="6 reps")
    level_9             = models.CharField(max_length=30, default="6 reps")
    level_10            = models.CharField(max_length=30, default="6 reps")

    def __str__(self):
        return self.name

#def create_10_levels_slash_instances():
#    something here






#def calculate_impact_on_stats():
#    something here
















