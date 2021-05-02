from rest_framework import serializers
from .models import *

#List of students
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassroomTable
        fields = '__all__'

class AssignmentDefaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

#Students in a classs
class ClassStudentSerializer(serializers.ModelSerializer):
    students = serializers.StringRelatedField(many=True)
    class Meta:
        model = ClassroomTable
        fields = ['id', 'code', 'name', 'students']


#List of classes student is enrolled in
class ClassListSerializer(serializers.ModelSerializer):
    classes = serializers.StringRelatedField(many=True)
    class Meta:
        model = Student
        fields = ['RollNumber', 'Name', 'phone', 'classes']


class TeacherClassSerializer(serializers.ModelSerializer):
    createdBy = serializers.StringRelatedField(many=True)
    class Meta:
        model = Teacher
        fields = ['name', 'createdBy']


#assignments in a classroom
class AssignmentSerializer(serializers.ModelSerializer):
    assignments = serializers.StringRelatedField(many=True)
    class Meta:
        model = ClassroomTable
        fields= ['id','code', 'name', 'subject_code', 'assignments']


class timeSerializer(serializers.ModelSerializer):
    time = serializers.StringRelatedField(many = True)
    class Meta:
        model = ClassroomTable
        fields = ['id', 'code', 'name', 'subject_code', 'department', 'teacher', 'time']


#Serializers for all tables 
#ClassroomStudents Table
class ClassStudentTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassroomStudents
        fields = '__all__' 


class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmission
        fields = '__all__' 