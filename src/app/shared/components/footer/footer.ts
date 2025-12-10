import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface FooterLink {
  label: string;
  action: string;
}

interface ContactItem {
  icon: string;
  iconColor: string;
  bgColor: string;
  content: string;
  link?: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  @Output() navigate = new EventEmitter<string>();

  constructor(private router: Router) {}

  protected readonly currentYear = new Date().getFullYear();

  // Social Media Links
  protected readonly socialLinks = [
    { name: 'Facebook', icon: 'facebook', ariaLabel: 'Visit our Facebook page', url: 'https://www.facebook.com/' },
    { name: 'Twitter', icon: 'twitter', ariaLabel: 'Follow us on Twitter', url: 'https://www.twitter.com/' },
    { name: 'LinkedIn', icon: 'linkedin', ariaLabel: 'Connect on LinkedIn', url: 'https://www.linkedin.com/' },
    { name: 'YouTube', icon: 'youtube', ariaLabel: 'Subscribe to our YouTube channel', url: 'https://www.youtube.com/' }
  ];

  // Footer Links
  protected readonly quickLinks: FooterLink[] = [
    { label: 'Car Catalog', action: '/' },
    { label: 'About Us', action: '/about-us' },
    { label: 'Services', action: '/services' },
    { label: 'Financing', action: '/financing' },
    { label: 'Trade-In', action: '/trade-in' }
  ];

  // Support Links
  protected readonly supportLinks: FooterLink[] = [
    { label: 'FAQ', action: '/faq' },
    { label: 'Contact Us', action: '/contact' },
    { label: 'Privacy Policy', action: '/privacy' },
    { label: 'Terms of Service', action: '/terms' },
    { label: 'Warranty', action: '/warranty' }
  ];

  // Contact Information
  protected readonly contactInfo: ContactItem[] = [
    {
      icon: 'map-pin',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      content: 'Sfax, Tunisia',
    },
    {
      icon: 'phone',
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      content: '+216 55 123 456',
      link: 'tel:+21655123456'
    },
    {
      icon: 'mail',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      content: 'info@autovision.com',
      link: 'mailto:info@autovision.com'
    }
  ];

  // Business Hours
  protected readonly businessHours = [
    { days: 'Mon - Fri', hours: '9:00 AM - 8:00 PM' },
    { days: 'Sat - Sun', hours: '10:00 AM - 6:00 PM' }
  ];

  // Bottom Links
  protected readonly bottomLinks = ['Privacy', 'Terms', 'Cookies'];

  // Navigation Handler
  protected onNavigate(page: string): void {
    this.router.navigate([page]);
  }

  // SVG Icon Getters
  protected getSocialIcon(iconName: string): string {
    const icons: Record<string, string> = {
      facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
      twitter: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
      linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
      youtube: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z'
    };
    return icons[iconName] || '';
  }

  // Contact Icon Getters
  protected getContactIcon(iconName: string): string {
    const icons: Record<string, string> = {
      'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
      'phone': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
      'mail': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6'
    };
    return icons[iconName] || '';
  }
}