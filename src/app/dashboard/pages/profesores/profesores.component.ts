import { Component, OnInit } from '@angular/core';
import { DataProfesor } from './modal';
import { Observable } from 'rxjs';
import { ProfesoresService } from './profesores.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfesoresFormDialogComponent } from './profesores-form-dialog/profesores-form-dialog.component';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
})
export class ProfesoresComponent implements OnInit{
  
  
  public data$: Observable<DataProfesor[]>;

  public displayedColumns = ['id', 'materia', 'name' , 'titulo', 'actions'];
  public isAdmin$ : Observable<boolean>


  constructor(private profeService: ProfesoresService,
    private matDialog: MatDialog,
    private store: Store)
    
    {
      this.data$ = this.profeService.getProfes()
      this.isAdmin$ = this.store.select(selectIsAdmin)
    }

    ngOnInit(): void {
      this.profeService.loadProfes();
    }

    onCreate():void{
      this.matDialog.open(ProfesoresFormDialogComponent)
    }

    onDelete(id: number): void{
      this.profeService.deleteById(id)
    }

    agregarProfe(): void{
      this.matDialog.open(ProfesoresFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v)=>{
          if(v){
            this.profeService.createProfe({
              name:v.name,
              titulo: v.titulo,
              materia: v.materia
            })
          }
        }
      })
    }
}
