import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('user_details') 
export class UserDetailsEntity {
   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column() 
   gender: string; 
   
   @Column() 
   country: string; 
}