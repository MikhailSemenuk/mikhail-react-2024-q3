export default function whereIAm(name: string) {
  if (typeof window === "undefined") {
    console.log(`Server ☁️: ${name}`);
  } else {
    console.log(`Browser 🌐: ${name}`);
  }
}
