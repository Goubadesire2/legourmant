'use server';

export interface ReservationState {
  success: boolean;
  message: string;
  bookingRef?: string;
  errors?: {
    fullName?: string;
    email?: string;
    phone?: string;
    date?: string;
  };
}

export async function createReservation(
  prevState: ReservationState | null,
  formData: any
): Promise<ReservationState> {
  // Simuler un léger délai
  await new Promise((resolve) => setTimeout(resolve, 800));

  const errors: ReservationState['errors'] = {};

  if (!formData.fullName || formData.fullName.trim().length < 3) {
    errors.fullName = 'Le nom complet doit comporter au moins 3 caractères.';
  }

  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Veuillez fournir une adresse email valide.';
  }

  if (!formData.phone || formData.phone.trim().length < 8) {
    errors.phone = 'Veuillez fournir un numéro de téléphone valide.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Certains champs sont invalides.',
      errors,
    };
  }

  const randomRef = 'EPI-' + Math.floor(100000 + Math.random() * 900000);

  return {
    success: true,
    message: 'Votre réservation a été enregistrée avec succès.',
    bookingRef: randomRef,
  };
}

// Export par défaut pour assurer la compatibilité Turbopack
export default createReservation;