import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';
import { Observable } from 'rxjs';
import { DealWithOwner } from '../../models/deal.interface';
import { API_CONSTANT } from '../../consts/CONSTANT';

@Injectable({
  providedIn: 'root'
})
export class DealsService extends CustomHttpService{
  getDeals(): Observable<{
    message: string,
    contents: DealWithOwner[]
  }>{
    return this.get(API_CONSTANT.deals)
  }
  
}
