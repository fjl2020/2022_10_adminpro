import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { NgChartsModule } from 'ng2-charts';
import { ModelImagenComponent } from './model-imagen/model-imagen.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DoughnutComponent,
    ModelImagenComponent,
  ],

  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [IncrementadorComponent, DoughnutComponent, ModelImagenComponent],
})
export class ComponentsModule {}
