import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { UserDetailsEntity } from './user_details.entity';
import { ProductEntity } from '../product/product.entity';

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;


  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @OneToOne(type => UserDetailsEntity) @JoinColumn({ name: 'detailId' }) 
  details: UserDetailsEntity;

  @OneToMany(type => ProductEntity, product => product.user) products:ProductEntity[]; 

  @ManyToMany(type => ProductEntity) @JoinTable() 
  fav: ProductEntity[];

}
