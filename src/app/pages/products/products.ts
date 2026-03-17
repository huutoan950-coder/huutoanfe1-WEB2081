import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.html',
})
export class Products {
  stories = [
    {
      name: 'Dragon Ball',
      author: 'Akira Toriyama',
      year: 1984,
      genre: 'Hành động, Võ thuật',
      image:
        'https://th.bing.com/th/id/R.a188e2ca3724e5deb9b74c29cf58fc6c?rik=DRAnEpYK3a7u1A&pid=ImgRaw&r=0',
      views: 150000,
    },
    {
      name: 'Attack On Titan',
      author: 'Hajime Isayama',
      year: 2009,
      genre: 'Hành động, Kịch tính',
      image:
        'https://tse2.mm.bing.net/th/id/OIP.aaooR5a82ubZ8XvEbh01EAHaKJ?rs=1&pid=ImgDetMain&o=7&rm=3',
      views: 85000,
    },
    {
      name: 'Bleach',
      author: 'Tite Kubo',
      year: 2001,
      genre: 'Hành động, Siêu nhiên',
      image:
        'https://th.bing.com/th/id/OIP.E-J1UC_go8izCXI5unEv8AHaKX?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
      views: 95000,
    },
  ];
}
