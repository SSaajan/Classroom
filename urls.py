from django.urls import path
from rest_framework import routers
from ClassAPI import views
from django.conf.urls import include

router = routers.DefaultRouter()
#Default get and post
router.register('teachers', views.teacherViewset)
router.register('students', views.studentViewset)
router.register('classes', views.classViewset)
router.register('assignments', views.AssignmentViewset)
#to find assignments in a class
router.register('classes/assignments', views.Assignments)
#To find the classes in which the students are enrolled in
router.register('students/enrolled', views.ClassList)
#class student mapping - to join class
router.register('class/enroll', views.ClassStudentViewswet)
#To submit assignment
router.register('assignment/submit', views.AssignmentSubmissionViewset)

urlpatterns = [
    path('', include(router.urls)),
    path('authenticate/<str:email>/<str:password>', views.authenticate),
    path('authenticate/teacher/<str:email>/<str:password>', views.TeacherAuthenticate),
    path('classes/students/<str:classCode>', views.ClassStudents),
    path('classes/timings/<str:classCode>', views.times),
    path('class/exists/<str:classCode>', views.ClassExists),
    path('teacher/classes/<int:ids>', views.TeacherClass),
    path('assignment/check/<str:roll>/<int:assignment>', views.checkAssignmentSubmission),
    path('assignment/getSubmissions/<int:id>', views.getSubmissions)
]

""" urlpatterns = [
    path('students/enrolled/<str:RollNumber>', views.ClassList),
    path('students/', views.studentList),
    path('classes/<str:classCode>', views.ClassSpecific),
    path('classes/<str:classCode>/assignments', views.Assignments),
    path('classes/', views.Class),
] """