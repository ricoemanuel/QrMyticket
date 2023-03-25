import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { LectorService } from '../servicios/lector.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lector-csv',
  templateUrl: './lector-csv.component.html',
  styleUrls: ['./lector-csv.component.css']
})
export class LectorCSVComponent {
  csvRecords: any;
  header: boolean = true;

  constructor(private ngxCsvParser: NgxCsvParser, private lectorService: LectorService) {
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): void => {
          console.log('Result', result);
          this.csvRecords = result;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
  }
  async registrar() {
    
    if (this.csvRecords.length > 0 && this.csvRecords != undefined) {
      Swal.fire({
        title: 'Guardando entradas...',
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        
      })
      await this.csvRecords.forEach(async (element: any) => {
        await this.lectorService.addEntrada(element)
      })
      Swal.fire({
        icon: 'success',
        title: 'Entradas registradas',
        showConfirmButton: false,
        timer: 1500
      })
      
    }
  }

}
