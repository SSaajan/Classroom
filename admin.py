from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(ClassroomTable)
admin.site.register(Assignment)
admin.site.register(ClassroomStudents)
admin.site.register(ClassTimings)
admin.site.register(AssignmentSubmission)