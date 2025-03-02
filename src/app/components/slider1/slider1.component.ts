import { Component } from '@angular/core';
import { Novedad } from '../../interfaces/novedad';
import { ItemSlider1Component } from '../item-slider1/item-slider1.component';

@Component({
  selector: 'app-slider1',
  imports: [ItemSlider1Component],
  templateUrl: './slider1.component.html',
  styleUrl: './slider1.component.css'
})
export class Slider1Component {

  listaNovedades: Novedad[] = [
    {
      id: 1,
      nombre: "Nike United Pack",
      enlace: "",
      imagen: "/images/nikeUnitedPack.png",
    },
    {
      id: 2,
      nombre: "Colección Nike 24.7",
      enlace: "",
      imagen: "/images/coleccionNike247.png",
    },
    {
      id: 3,
      nombre: "Cosmic Runner",
      enlace: "",
      imagen: "/images/cosmicRunner.png",
    },
    {
      id: 4,
      nombre: "Próximamente: Air Max Dn8",
      enlace: "",
      imagen: "/images/proximamenteAirMaxDn8.png",
    },
    {
      id: 5,
      nombre: "Ropa de running",
      enlace: "",
      imagen: "/images/ropaDeRunning.png",
    },
  ]

}
