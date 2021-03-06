import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';


@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository:TasksRepository)
    {}

    // getTasksWithFilters(filterDto:GetTasksFilterDto):Task[]{
    //     const {status,search} = {...filterDto};

    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status )
    //     }

    //     if(search){
    //         tasks = tasks.filter( task => task.title.includes(search) || task.description.includes(search) );
    //     }

    //     return tasks;
    // }

    // getAllTasks():Task[]{
    //     return this.tasks;
    // }

    async getTaskById(id:string): Promise<Task> {

        const found = await this.tasksRepository.findOne({where:{id:id}})

        if(!found)
            throw new NotFoundException(`Task with id:${id} not found`);

        return found
    }

    // async createTask(createTaskDto:CreateTaskDto): Promise<Task>{

    //     const {title, description} = {...createTaskDto};
       
    //     const task = this.tasksRepository.create({
    //         title,
    //         description,
    //         status:TaskStatus.OPEN
    //     });

    //     await this.tasksRepository.save(task);
    //     return task;
    // }

    // deleteTask(id:string):void{
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter( task => task.id !== found.id );
    // }

    // updateTaskStatus(id:string, status:TaskStatus):Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
