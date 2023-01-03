import { Component, enableProdMode, OnInit, ViewEncapsulation , Input} from '@angular/core';
import { link } from 'fs';
import { Router } from '@angular/router';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';



import { AngularGridInstance, Column, GridOption, Formatters, Formatter, FieldType } from './../modules/angular-slickgrid'
import { DataService } from '../data.service';

interface DataItem {
  id: number;
  username: number;
  dateCreated: Date;
  organizationName: string;
  unitName: string;
  uuid: string;
  lastLoginDate: Date;
}



const ITEMSNo = 995;

const customEnableButtonFormatter: Formatter<DataItem> = (row: number, _cell: number, _value: any, dataContext:any) => {
  return "<a style='color:#4996D0; text-decoration:none;cursor:pointer' onclick='navigateData(" + dataContext.Id + ", " + row + ")'>User detail</a>";;
};

@Component({
  templateUrl: './main-grid-page.component.html',
  encapsulation: ViewEncapsulation.None
})

export class MainGridPageComponent implements OnInit {
  title = 'User Management';
  subTitle = `
  Welcome to User Management screen!
  `;


  message!: string;

  columnDefinitions_1: Column[] = [];
  gridOptions_1: GridOption = {};
  dataset_1!: any[];
  angularGrid!: AngularGridInstance;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  constructor(private router: Router, private data:DataService) { 
    
  }


  ngOnInit(): void {
    this.columnDefinitions_1 = [
      { id: 's-no', name: 'S_No', field: 'id', sortable: true, width: 80, minWidth: 20, maxWidth: 80 },
      {
        id: 'username', name: 'Username', field: 'username', type: FieldType.number, sortable: true, formatter: customEnableButtonFormatter,
        onCellClick: (e, args) => {
          //this.toggleCompletedProperty(args && args.dataContext);
          this.newMessage()
          this.router.navigate(['/main-grid-page/:id']);
        }

        
      },
      { id: 'date-created', name: 'Date Created', field: 'dateCreated', formatter: Formatters.dateIso, width: 80, minWidth: 20, maxWidth: 150 },
      { id: 'organization-name', name: 'Organization name', field: 'organizationName', sortable: true },
      { id: 'unit-name', name: 'Unit name', field: 'unitName', sortable: true },
      { id: 'uuid', name: 'UUID', field: 'uuid', sortable: true },
      { id: 'last-login-date', name: 'Last Login date', field: 'lastLoginDate', formatter: Formatters.dateIso },
      
    ];
    this.gridOptions_1 = {
      alwaysShowVerticalScroll: true,
      autoEdit: false,
      asyncEditorLoading: false,
      autoFitColumnsOnFirstLoad: true,
      autoResize: {
        applyResizeToContainer: true,
        calculateAvailableSizeBy: 'window',
        bottomPadding: 20,
        minHeight: 180,
        minWidth: 300,
        rightPadding: 80
      },
      cellHighlightCssClass: 'slick-cell-modified',
      checkboxSelector: {
        cssClass: 'slick-cell-checkboxsel'
      },
      enableSorting: true,
    };

    this.dataset_1 = this.mockData(ITEMSNo);


    this.data.currentMessage.subscribe(message => this.message = message)

  }
  mockData(count: number) {
    const mockDatasetItems = [];
    for (let j = 0; j < count; j++) {
      const randYear = 2000 + Math.floor(Math.random() * 10);
      const randMonth = Math.floor(Math.random() * 11);
      const randDay = Math.floor((Math.random() * 29));

      mockDatasetItems[j] = {
        id: j,
        dateCreated: new Date(randYear, randMonth + 1, randDay),
        organizationName: 'Organization ' + j,
        unitName: 'Unit ' + j,
        uuid: 'UU' + Math.round(Math.random() * 10000000),
        lastLoginDate: new Date(randYear + 1, randMonth + 1, randDay)
      };
    }

    return mockDatasetItems;
  }
  toggleCompletedProperty(item: any) {
    // toggle property
    if (typeof item === 'object') {
      item.completed = !item.completed;

      // simulate a backend http call and refresh the grid row after delay
      setTimeout(() => {
        this.angularGrid.gridService.updateItemById(item.id, item, { highlightRow: false });
      }, 250);
    }
  }

  btnClick = () => {
    this.router.navigate(['/main-grid-page/:id']);
  };
  onLogout(): void {
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();
    this.router.navigate(["login-page"])
  }
  exit(){
    window.location.reload();
  }

  newMessage(){
    this.data.changeMessage('hello')
  }

}



