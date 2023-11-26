from django.shortcuts import render
# from django.views.decorators import csrf_exempt 
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from EmployeeApp.models import Departments,Employees
from EmployeeApp.serializers import DepartmentSerializer, EmployeeSerializer
from django.core.files.storage import default_storage


@csrf_exempt
def departmentApi(request,id=0):
    if request.method=='GET':
        departments =  Departments.objects.all()
        departments_serializer = DepartmentSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)

    elif request.method=='POST':
        department_data = JSONParser().parse(request)
        departments_serializer = DepartmentSerializer(data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse('Saved Succesfully', safe=False)
        return JsonResponse('Saving Faild', safe=False)

    elif request.method=='PUT':  
        department_data = JSONParser().parse(request) 
        departments =  Departments.objects.get(DepartmentId=department_data['DepartmentId'])
        departments_serializer = DepartmentSerializer(departments, data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse('Updated Succesfully', safe=False)
        return JsonResponse('Updating Faild', safe=False)  

    elif request.method=='DELETE':    
        departments = Departments.objects.get(DepartmentId=id)
        departments.delete()
        return JsonResponse('Deleted Succesfully', safe=False)


@csrf_exempt
def employeeApi(request,id=0):
    if request.method=='GET':
        employees =  Employees.objects.all()
        employees_serializer = EmployeeSerializer(employees, many=True)
        return JsonResponse(employees_serializer.data, safe=False)

    elif request.method=='POST':
        employee_data = JSONParser().parse(request)
        employees_serializer = EmployeeSerializer(data=employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse('Saved Succesfully', safe=False)
        return JsonResponse('Saving Faild', safe=False)

    elif request.method=='PUT':  
        employee_data = JSONParser().parse(request) 
        employees =  Employees.objects.get(EmployeeId=employee_data['EmployeeId'])
        employees_serializer = EmployeeSerializer(employees, data=employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse('Updated Succesfully', safe=False)
        return JsonResponse('Updating Faild', safe=False)  

    elif request.method=='DELETE':    
        employees = Employees.objects.get(EmployeeId=id)
        employees.delete()
        return JsonResponse('Deleted Succesfully', safe=False)


@csrf_exempt
def SaveFile(request):
    file = request.FILES['myFile']
    file_name = default_storage.save(file.name,file)
    return JsonResponse(file_name, safe=False)
