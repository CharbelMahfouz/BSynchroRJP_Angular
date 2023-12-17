import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/app-state/entity';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  @Input() userInfo: User;


  editingId: any;

  

  ngOnInit(): void {
  }

  

 

  openModal(template: TemplateRef<any>) {
   
    this.modalRef = this.modalService.show(template);
  }

}
