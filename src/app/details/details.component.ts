import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article class="details-container">
      <div class="image-container">
        <img
          class="listing-photo"
          [src]="housingLocation?.photo"
          [alt]="housingLocation?.name"
        />
        <div class="image-overlay">
          <h1 class="overlay-heading">{{ housingLocation?.name }}</h1>
          <p class="overlay-location">
            {{ housingLocation?.city }}, {{ housingLocation?.state }}
          </p>
        </div>
      </div>

      <div class="content-wrapper">
        <section class="listing-features">
          <h2 class="section-heading">Property Details</h2>
          <div class="features-grid">
            <div class="feature-item">
              <span class="feature-icon">🏠</span>
              <div class="feature-content">
                <h3>Units Available</h3>
                <p>{{ housingLocation?.availableUnits }}</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📶</span>
              <div class="feature-content">
                <h3>WiFi</h3>
                <p>
                  {{ housingLocation?.wifi ? "Available" : "Not Available" }}
                </p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">👕</span>
              <div class="feature-content">
                <h3>Laundry</h3>
                <p>
                  {{ housingLocation?.laundry ? "Available" : "Not Available" }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="listing-apply">
          <div class="apply-content">
            <h2 class="section-heading">Ready to Move In?</h2>
            <p class="apply-description">
              Submit your application now to secure your spot at this amazing
              location.
            </p>

            <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
              <label for="first-name">First Name</label>
              <input id="first-name" type="text" formControlName="firstName" />

              <label for="last-name">Last Name</label>
              <input id="last-name" type="text" formControlName="lastName" />

              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" />
              <button class="apply-button" type="submit">
                Apply Now
                <span class="button-icon">→</span>
              </button>
            </form>
          </div>
        </section>
      </div>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingLocation =
      this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
