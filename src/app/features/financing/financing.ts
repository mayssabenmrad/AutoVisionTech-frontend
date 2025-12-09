import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '@shared/components/hero/hero';
import { InfoCard } from '@shared/components/info-card/info-card';

@Component({
  selector: 'app-financing',
  standalone: true,
  imports: [CommonModule, FormsModule, Hero, InfoCard],
  templateUrl: './financing.html',
  styleUrls: ['./financing.css']
})
export class Financing {
  protected heroIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="brand-icon w-15 h-15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  `;

  // Calculator
  protected vehiclePrice = signal(30000);
  protected downPayment = signal(5000);
  protected interestRate = signal(4.5);
  protected loanTerm = signal(60);

  protected financingOptions = [
    {
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Traditional Auto Loan',
      description: 'Fixed monthly payments with competitive interest rates. Own your vehicle at the end of the term.',
      features: ['Fixed interest rates from 3.9%', 'Terms from 36 to 84 months', 'No early payoff penalties', 'Build vehicle equity']
    },
    {
      icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
      title: 'Lease Program',
      description: 'Lower monthly payments with the flexibility to upgrade every few years. Perfect for those who like new vehicles.',
      features: ['Lower monthly payments', 'Warranty coverage', 'Upgrade flexibility', 'Mileage options available']
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Special Financing',
      description: 'Limited-time promotional rates and incentives for qualified buyers.',
      features: ['0% APR offers available', 'Manufacturer incentives', 'First-time buyer programs', 'Military & veteran discounts']
    }
  ];

  protected benefits = [
    {
      icon: 'M5 13l4 4L19 7',
      title: 'Quick Approval',
      description: 'Get pre-approved in minutes with our streamlined process'
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Secure Process',
      description: 'Bank-level encryption protects your personal information'
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Same-Day Funding',
      description: 'Drive away today with approved financing'
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      title: 'Multiple Lenders',
      description: 'Access to a network of trusted financial partners'
    }
  ];

  protected requirements = [
    'Valid driver\'s license',
    'Proof of income (pay stubs, tax returns)',
    'Proof of residence (utility bill, lease agreement)',
    'Insurance information',
    'Social Security number',
    'References (personal and professional)'
  ];

  protected get monthlyPayment(): number {
    const principal = this.vehiclePrice() - this.downPayment();
    const monthlyRate = this.interestRate() / 100 / 12;
    const numPayments = this.loanTerm();
    
    if (monthlyRate === 0) return principal / numPayments;
    
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  protected get totalPayment(): number {
    return this.monthlyPayment * this.loanTerm() + this.downPayment();
  }

  protected get totalInterest(): number {
    return this.totalPayment - this.vehiclePrice();
  }
}