from django.db import models
import random
import string
# Create your models here.

class Teacher(models.Model):
    ID = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    phone = models.CharField(max_length=12)
    mail = models.EmailField(max_length=254)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Student(models.Model):
    RollNumber = models.CharField(max_length=10, primary_key=True)
    Name = models.CharField(max_length=50)
    phone = models.CharField(max_length=12)
    mail = models.EmailField(max_length=254)
    department = models.CharField(max_length=50)
    section = models.CharField(max_length=10)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.RollNumber + " - " + self.Name


class ClassroomTable(models.Model):
    name = models.CharField(max_length=50)
    subject_code = models.CharField(max_length=10)
    department = models.CharField(max_length=50)
    code = models.CharField(max_length=10, blank=True, null=True)
    teacher = models.ForeignKey('Teacher', related_name='createdBy', on_delete=models.PROTECT)

    def save(self, *args, **kwargs):
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 7))
        existing_codes = ClassroomTable.objects.all().filter(code__iexact=code).count()
        while(existing_codes):
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 7))
            existing_codes = ClassroomTable.objects.all().filter(code__iexact=code).count()
        self.code = code
        super(ClassroomTable, self).save(*args, **kwargs)
    
    def __str__(self):
        return(self.code)


class ClassTimings(models.Model):
    classroom = models.ForeignKey('ClassroomTable', related_name='time', on_delete=models.CASCADE)
    dayNum = models.IntegerField(blank=True, null=True)
    time = models.TimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return("{},{}".format(self.dayNum, self.time))


class ClassroomStudents(models.Model):
    classroom = models.ForeignKey('ClassroomTable', related_name='students', on_delete=models.CASCADE)
    student = models.ForeignKey('Student', related_name='classes', on_delete=models.CASCADE)
    def __str__(self):
        return("{},{},{}".format(self.classroom.code, self.student.RollNumber,self.student.Name))
        #return(("{} - {} : {}").format(str(self.classroom.name), self.classroom.code, str(self.student)))


class Assignment(models.Model):
    classroom = models.ForeignKey('ClassroomTable',  related_name='assignments', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    createdOn = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(blank=True, null=True)
    attachmentLink = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return(("{},{},{},{}").format(self.id, self.title, self.deadline, self.description))


class AssignmentSubmission(models.Model):
    readonly_fields = ('time')
    AssignmentNum = models.ForeignKey('Assignment', related_name='submission', on_delete=models.CASCADE)
    SubmittedBy = models.ForeignKey('Student', related_name='submittedBy', on_delete=models.CASCADE)
    SubmissionText = models.TextField(blank=True, null=True)
    SubmissionLink = models.TextField(blank=True, null=True)
    MarkAsDone = models.IntegerField()
    Marks = models.IntegerField(blank=True, null=True)
    time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return(("{},  {}").format(self.SubmittedBy, self.AssignmentNum))