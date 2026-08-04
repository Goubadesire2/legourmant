'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Users, Clock, CheckCircle2, ChevronLeft, ChevronRight, MapPin, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReservationDetails } from '@/types';
import createReservation from '@/app/actions/reservation';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: Partial<ReservationDetails>;
}

export function ReservationModal({ isOpen, onClose, initialDetails }: ReservationModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // État du formulaire
  const [guests, setGuests] = useState<string>('2');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>('20:00');
  const [zone, setZone] = useState<string>('salle');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // États Server Action
  const [isPending, setIsPending] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Synchronisation avec les choix du Hero s'ils existent
  useEffect(() => {
    if (initialDetails) {
      if (initialDetails.guests) setGuests(initialDetails.guests);
      if (initialDetails.date) setDate(initialDetails.date);
      if (initialDetails.time) setTime(initialDetails.time);
    }
  }, [initialDetails, isOpen]);

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsSubmitted(false);
      setServerError(null);
      setBookingRef(null);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setServerError(null);

    const result = await createReservation(null, {
      guests,
      date,
      time,
      zone,
      fullName,
      email,
      phone,
      specialRequests,
    });

    setIsPending(false);

    if (result.success && result.bookingRef) {
      setBookingRef(result.bookingRef);
      setIsSubmitted(true);
    } else {
      setServerError(result.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleResetAndClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border/80 backdrop-blur-2xl p-6 sm:p-8">
        
        {!isSubmitted ? (
          <>
            <DialogHeader className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === i
                        ? 'w-8 bg-primary'
                        : step > i
                        ? 'w-4 bg-primary/40'
                        : 'w-4 bg-muted'
                    }`}
                  />
                ))}
              </div>
              <DialogTitle className="text-2xl font-serif-title font-normal text-foreground">
                {step === 1 && "1. Votre Service"}
                {step === 2 && "2. L'Ambiance & Préférences"}
                {step === 3 && "3. Vos Coordonnées"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {step === 1 && "Sélectionnez le nombre de personnes, la date et l'horaire."}
                {step === 2 && "Choisissez l'emplacement souhaité dans l'établissement."}
                {step === 3 && "Finalisez vos informations pour recevoir votre confirmation instantanée."}
              </DialogDescription>
            </DialogHeader>

            {/* Message d'erreur serveur si validation échouée */}
            {serverError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* ÉTAPE 1 : Date, Heure, Convives */}
            {step === 1 && (
              <div className="space-y-5 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Convives */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-primary" /> Personnes
                    </Label>
                    <Select value={guests} onValueChange={(val) => setGuests(val || '')}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Nbre de personnes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Personne</SelectItem>
                        <SelectItem value="2">2 Personnes</SelectItem>
                        <SelectItem value="3">3 Personnes</SelectItem>
                        <SelectItem value="4">4 Personnes</SelectItem>
                        <SelectItem value="5">5 Personnes</SelectItem>
                        <SelectItem value="6">6 Personnes et +</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Horaire */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-primary" /> Heure du service
                    </Label>
                    <Select value={time} onValueChange={(val) => setGuests(val || '')}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Horaire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:30">12:30 - Déjeuner</SelectItem>
                        <SelectItem value="13:00">13:00 - Déjeuner</SelectItem>
                        <SelectItem value="19:30">19:30 - Dîner</SelectItem>
                        <SelectItem value="20:00">20:00 - Dîner</SelectItem>
                        <SelectItem value="21:00">21:00 - Dîner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-primary" /> Date de réservation
                  </Label>
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="outline" className="w-full justify-start text-left bg-background/50">
                        {date ? (
                          date.toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        ) : (
                          <span>Choisir une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar mode="single" selected={date} onSelect={setDate} />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button onClick={() => setStep(2)} className="w-full gap-2 mt-4">
                  Continuer vers l&apos;ambiance <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* ÉTAPE 2 : Choix de la Zone / Ambiance */}
            {step === 2 && (
              <div className="space-y-5 py-4">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Choisissez votre espace
                </Label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'salle', title: 'Grande Salle', desc: 'Ambiance feutrée & élégante' },
                    { id: 'terrasse', title: 'La Terrasse', desc: 'Vue jardin & lampions' },
                    { id: 'chef', title: 'Table du Chef', desc: 'Privilégiée près de la cuisine' },
                  ].map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setZone(z.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        zone === z.id
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border/60 bg-background/30 hover:border-border'
                      }`}
                    >
                      <div className="font-serif-title font-medium text-sm text-foreground mb-1">
                        {z.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-tight">
                        {z.desc}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Demandes particulières (facultatif)
                  </Label>
                  <Textarea
                    placeholder="Allergies, anniversaire, préférence de placement..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="bg-background/50 text-xs h-20 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-1">
                    <ChevronLeft className="w-4 h-4" /> Retour
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1 gap-1">
                    Saisir mes coordonnées <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 : Informations personnelles */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Nom & Prénom *
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="Jean Dupont"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-background/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="jean@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Téléphone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+33 6 12 34 56 78"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/30 border border-border/40 text-[11px] text-muted-foreground space-y-1">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Récapitulatif :
                  </div>
                  <div>
                    {guests} personne(s) • Le {date?.toLocaleDateString('fr-FR')} à {time} ({zone})
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="gap-1">
                    <ChevronLeft className="w-4 h-4" /> Retour
                  </Button>
                  <Button type="submit" disabled={isPending} className="flex-1 font-bold">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Validation en cours...
                      </>
                    ) : (
                      'Confirmer la réservation'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </>
        ) : (
          /* Confirmation finale */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto border border-primary/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <DialogTitle className="text-3xl font-serif-title font-normal text-foreground">
              Réservation Confirmée !
            </DialogTitle>
            
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Merci <span className="font-semibold text-foreground">{fullName}</span>. Un e-mail de confirmation vient d&apos;être envoyé à <span className="text-primary">{email}</span>.
            </p>

            {/* Code de réservation unique */}
            {bookingRef && (
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-center max-w-xs mx-auto my-4">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                  Code de confirmation unique
                </span>
                <span className="text-xl font-mono font-bold text-primary">
                  {bookingRef}
                </span>
              </div>
            )}

            <div className="pt-4">
              <Button onClick={handleResetAndClose} variant="outline" className="rounded-full px-8">
                Fermer
              </Button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}