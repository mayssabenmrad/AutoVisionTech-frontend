import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '@shared/components/hero/hero';
import { InfoCard } from '@shared/components/info-card/info-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, Hero, InfoCard, RouterLink],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']
})
export class AboutUs {
  protected heroIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="brand-icon w-15 h-15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  `;

  protected stats = [
    { label: 'Years of Excellence', value: '15+', icon: 'calendar' },
    { label: 'Happy Customers', value: '10,000+', icon: 'users' },
    { label: 'Premium Vehicles', value: '500+', icon: 'car' },
    { label: 'Expert Team Members', value: '50+', icon: 'team' }
  ];

  protected values = [
    {
      icon: 'shield',
      title: 'Trust & Integrity',
      description: 'We build lasting relationships through transparent and honest business practices.'
    },
    {
      icon: 'star',
      title: 'Quality Excellence',
      description: 'Every vehicle in our collection meets the highest standards of quality and performance.'
    },
    {
      icon: 'heart',
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.'
    },
    {
      icon: 'award',
      title: 'Innovation',
      description: 'We continuously evolve to provide cutting-edge solutions and experiences.'
    }
  ];

  protected team = [
    {
      name: 'Affes Mohamed',
      role: 'CEO & Founder',
      image: 'affes.jpg',
      bio: 'Visionary leader with 20+ years in automotive industry'
    },
    {
      name: 'Ben M\'rad Mayssa',
      role: 'Head of Sales',
      image: 'mayssa.jpg',
      bio: 'Expert in luxury automotive sales and customer relations'
    },
    {
      name: 'Meddeb Ghazi',
      role: 'Technical Director',
      image: 'ghazi.jpg',
      bio: 'Certified technician specializing in premium vehicles'
    },
  ];

  protected getStatIcon(icon: string): string {
    const icons: Record<string, string> = {
      calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      car: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2M7 17a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z',
      team: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    };
    return icons[icon] || '';
  }

  protected getValueIcon(icon: string): string {
    const icons: Record<string, string> = {
      shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      award: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    };
    return icons[icon] || '';
  }
}