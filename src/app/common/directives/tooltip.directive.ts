import {Directive, ElementRef, Input, HostListener} from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class Tooltip {
  @Input() tooltip: string;
  @Input() color: string = 'black'; // black,white背景色
  @Input() direction: string = 'bottom';// top,left,right,bottom
  @Input() showAnyway: boolean = false; // 若为true，则不管是否超出设定长度都显示
  newDiv: any;
  ELDOM: any;

  constructor(el: ElementRef) {
    var vm = this;
    el.nativeElement.style.position = 'relative';
    vm.newDiv = document.createElement('div');
    // todo 0629 设置位置和颜色，并且不一定需要超长才展示
    vm.newDiv.style.position = 'absolute';
    vm.newDiv.style.zIndex = 1000;
    vm.newDiv.style.borderRadius = '8px';
    vm.newDiv.style.padding = '5px 15px';
    vm.newDiv.style.lineHeight = '24px';
    vm.newDiv.style.fontSize = '12px';
    vm.newDiv.style.display = 'none';
    // 配置颜色
    if (vm.color === 'black') {
      vm.newDiv.style.background = '#000';
      vm.newDiv.style.color = '#fff';
    } else {
      vm.newDiv.style.background = '#fff';
      vm.newDiv.style.color = '#000';
    }

    vm.newDiv.onmouseenter = function () {
      vm.newDiv.style.display = 'block';
    };
    vm.newDiv.onmouseleave = function () {
      vm.newDiv.style.display = 'none';
    };
    document.body.appendChild(this.newDiv);
    vm.ELDOM = el;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.tooltip && this.ELDOM.nativeElement.clientWidth < this.ELDOM.nativeElement.scrollWidth || this.showAnyway) {
      this.newDiv.style.display = 'block';
      this.newDiv.innerText = this.tooltip;
      let left = 0, top = 0;
      if (this.direction == 'bottom') {
        top = this.ELDOM.nativeElement.offsetTop + this.ELDOM.nativeElement.clientHeight;
        left = this.ELDOM.nativeElement.offsetLeft;
      } else if (this.direction == 'top') {
        top = (this.ELDOM.nativeElement.offsetTop - this.ELDOM.nativeElement.clientHeight + 15 > 0 ? this.ELDOM.nativeElement.offsetTop - this.ELDOM.nativeElement.clientHeight + 15 : 0);
        left = this.ELDOM.nativeElement.offsetLeft;
      } else if (this.direction == 'left') {
        top = this.ELDOM.nativeElement.offsetTop + this.ELDOM.nativeElement.clientHeight/2-16;
        left = (this.ELDOM.nativeElement.offsetLeft - this.ELDOM.nativeElement.clientWidth + 50 > 0 ? this.ELDOM.nativeElement.offsetLeft - this.ELDOM.nativeElement.clientWidth + 50 : 0);
      } else if (this.direction == 'right') {
        top = this.ELDOM.nativeElement.offsetTop + this.ELDOM.nativeElement.clientHeight/2-16;
        left = this.ELDOM.nativeElement.offsetLeft + this.ELDOM.nativeElement.clientWidth;
      }

      this.newDiv.style.top = top + 'px';
      this.newDiv.style.left = left + 'px'//+ this.ELDOM.nativeElement.clientWidth * 0.5
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.newDiv.style.display = 'none';
    this.newDiv.innerText = this.tooltip;
  }

}
