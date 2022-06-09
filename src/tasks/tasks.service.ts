import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/dto/get-tasks.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getTasksWithFilters(filterDto:GetTasksFilterDto):Task[]{
        const {status,search} = {...filterDto};

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status )
        }

        if(search){
            tasks = tasks.filter( task => task.title.includes(search) || task.description.includes(search) );
        }

        return tasks;
    }

    getAllTasks():Task[]{
        return this.tasks;
    }

    getTaskById(id:string):Task{
        return this.tasks.find( task => task.id === id );
    }

    createTask(createTaskDto:CreateTaskDto):Task{
        const { title, description } = createTaskDto;

        const task:Task = {
            id:uuid(),
            title:title,
            description:description,
            status:TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task
    }

    deleteTask(id:string):void{
        this.tasks = this.tasks.filter( task => task.id !== id );
    }

    updateTaskStatus(id:string, status:TaskStatus):Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
