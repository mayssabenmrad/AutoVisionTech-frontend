import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '@shared/components/hero/hero';
import { InfoCard } from '@shared/components/info-card/info-card';

interface TradeInForm {
  // Vehicle Information
  year: string;
  make: string;
  model: string;
  trim: string;
  mileage: string;
  condition: string;
  
  // Contact Information
  name: string;
  email: string;
  phone: string;
  
  // Additional Information
  description: string;
}

@Component({
  selector: 'app-trade-in',
  standalone: true,
  imports: [CommonModule, FormsModule, Hero, InfoCard],
  templateUrl: './trade-in.html',
  styleUrls: ['./trade-in.css']
})
export class TradeIn {
  protected heroIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="brand-icon w-15 h-15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
    </svg>
  `;

  thisYearPlusOne = new Date().getFullYear() + 1;

  protected showForm = signal(false);
  protected formSubmitted = signal(false);

  protected tradeInForm: TradeInForm = {
    year: '',
    make: '',
    model: '',
    trim: '',
    mileage: '',
    condition: 'excellent',
    name: '',
    email: '',
    phone: '',
    description: ''
  };

  protected howItWorks = [
    {
      step: '01',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      title: 'Get an Estimate',
      description: 'Fill out our simple online form with details about your vehicle'
    },
    {
      step: '02',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Vehicle Inspection',
      description: 'Our experts will inspect your vehicle and verify its condition'
    },
    {
      step: '03',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Receive Your Offer',
      description: 'Get a competitive offer based on current market value'
    },
    {
      step: '04',
      icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
      title: 'Complete the Trade',
      description: 'Apply your trade-in value toward your next vehicle or get cash'
    }
  ];

  protected benefits = [
    {
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Fair Market Value',
      description: 'We offer competitive prices based on current market conditions and vehicle condition'
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Quick Process',
      description: 'Get an instant estimate online and complete the trade-in within hours'
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'No Obligations',
      description: 'Get your trade-in value estimate with no commitment required'
    },
    {
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      title: 'Hassle-Free Paperwork',
      description: 'We handle all the documentation and DMV requirements for you'
    }
  ];

  protected factors = [
    { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', text: 'Year, Make, and Model' },
    { icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', text: 'Current Mileage' },
    { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Overall Condition' },
    { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', text: 'Service History' },
    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Market Demand' },
    { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', text: 'Optional Features' }
  ];

  protected tips = [
    'Clean your vehicle inside and out before the inspection',
    'Gather all maintenance records and receipts',
    'Remove personal items and clear storage compartments',
    'Make minor repairs if cost-effective',
    'Be honest about any issues or damage',
    'Have your vehicle title ready'
  ];

  protected toggleForm(): void {
    this.showForm.update(v => !v);
  }

  protected onSubmit(): void {
    if (this.isFormValid()) {
      console.log('Trade-in form submitted:', this.tradeInForm);
      this.formSubmitted.set(true);
      this.showForm.set(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.formSubmitted.set(false);
        this.resetForm();
      }, 3000);
    }
  }

  protected isFormValid(): boolean {
    return !!(
      this.tradeInForm.year &&
      this.tradeInForm.make &&
      this.tradeInForm.model &&
      this.tradeInForm.mileage &&
      this.tradeInForm.name &&
      this.tradeInForm.email &&
      this.tradeInForm.phone
    );
  }

  protected resetForm(): void {
    this.tradeInForm = {
      year: '',
      make: '',
      model: '',
      trim: '',
      mileage: '',
      condition: 'excellent',
      name: '',
      email: '',
      phone: '',
      description: ''
    };
  }
}