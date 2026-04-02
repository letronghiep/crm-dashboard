import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'crm-dashboard';

  constructor(private translate: TranslateService) {
    // Khởi tạo ngôn ngữ
    this.translate.addLangs(['en', 'vi']);
    this.translate.setDefaultLang('vi');
    
    // Lấy ngôn ngữ từ localStorage hoặc dùng mặc định
    const savedLang = localStorage.getItem('language') || 'vi';
    this.translate.use(savedLang);
  }

  ngOnInit(): void {}
}
