import { Component, Input } from '@angular/core';
import { Novedad } from '../../interfaces/novedad';

@Component({
  selector: 'app-item-slider1',
  imports: [],
  templateUrl: './item-slider1.component.html',
  styleUrl: './item-slider1.component.css'
})
export class ItemSlider1Component {

  @Input() novedad: Novedad = { id: 0, nombre: '', enlace: '', imagen: '' };

}
