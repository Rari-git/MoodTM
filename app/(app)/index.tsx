import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function AppIndex() {
  const router = useRouter();

  // Folosim useEffect pentru a redirecționa manual
  // imediat ce componenta se încarcă.
  useEffect(() => {
    // Folosim '(tabs)' (relativ) și 'as any' pentru a ignora
    // eroarea de tipare (TypeScript) care era incorectă.
    router.replace('(tabs)' as any);
  }, [router]);

  // Nu randăm nimic vizibil, deoarece redirecționarea
  // este instantanee. Un View gol este suficient.
  return <View />;
}