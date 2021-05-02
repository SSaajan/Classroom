from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
import sys

class studentViewset(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StudentSerializer


class teacherViewset(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TeacherSerializer


#To find students in each classroom
def ClassStudents(request, classCode):
    if request.method == 'GET':
        classes = ClassroomTable.objects.get(code=classCode)
        serializer = ClassStudentSerializer(classes)
        return JsonResponse(serializer.data)

def authenticate(request, email, password):
    if request.method == 'GET':
        student = Student.objects.get(mail=email)
        serializer = StudentSerializer(student)
        if(serializer.data['password'] == password):
            return JsonResponse(serializer.data)
        else:
            return JsonResponse("false", safe=False)

def TeacherAuthenticate(request, email, password):
    if request.method == 'GET':
        teacher = Teacher.objects.get(mail=email)
        serializer = TeacherSerializer(teacher)
        if(serializer.data['password'] == password):
            return JsonResponse(serializer.data)
        else:
            return JsonResponse("false", safe=False)


#To find the classes in which the students are enrolled in
class ClassList(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ClassListSerializer

def Classes(request, code):
    if request.method == 'GET':
        classes = ClassroomTable.objects.get(code=code)
        serializer = ClassesSerializer(classes)
        return JsonResponse(serializer.data)

class Assignments(viewsets.ModelViewSet):
    queryset = ClassroomTable.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AssignmentSerializer


class AssignmentViewset(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AssignmentDefaultSerializer


class AssignmentSubmissionViewset(viewsets.ModelViewSet):
    queryset = AssignmentSubmission.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AssignmentSubmissionSerializer


def times(request, classCode):
    if request.method == 'GET':
        classes = ClassroomTable.objects.get(code=classCode)
        serializer = timeSerializer(classes)
        return JsonResponse(serializer.data)


def TeacherClass(request, ids):
    if request.method == 'GET':
        teacher = Teacher.objects.get(ID=ids)
        serializer = TeacherClassSerializer(teacher)
        return JsonResponse(serializer.data)

def ClassExists(request, classCode):
    if request.method == 'GET':
        if(ClassroomTable.objects.filter(code=classCode).exists()):
            classes = ClassroomTable.objects.get(code=classCode)
            serializer = ClassStudentSerializer(classes)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse("false", safe=False)

class ClassStudentViewswet(viewsets.ModelViewSet):
    queryset = ClassroomStudents.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ClassStudentTableSerializer


class classViewset(viewsets.ModelViewSet):
    queryset = ClassroomTable.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ClassesSerializer


def checkAssignmentSubmission(request, roll, assignment):
    if(request.method == 'GET'):
        if(AssignmentSubmission.objects.filter(AssignmentNum=assignment, SubmittedBy=roll).exists()):
            return JsonResponse("true", safe=False)
        else:
            return JsonResponse("false", safe=False)


def getSubmissions(request, id):
    if(request.method == 'GET'):
        if(AssignmentSubmission.objects.filter(AssignmentNum=id).exists()):
            submissions = AssignmentSubmission.objects.filter(AssignmentNum=id)
            serializer = AssignmentSubmissionSerializer(submissions, many=True)
            return JsonResponse(serializer.data, safe=False)
