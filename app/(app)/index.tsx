// app/(app)/index.tsx
import { Redirect } from 'expo-router';
import React from 'react';

export default function AppIndex() {
  // Folosim "as any" pentru a forța TypeScript
  // să accepte această cale, pe care o știm ca fiind validă.
  return <Redirect href={"(tabs)" as any} />;
}