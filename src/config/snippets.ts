
export const languages: { [languageId: string]: { name: string; code: string } } = {
  java: { name: "Java", code: `public class Main {

    public static void main(String[] args) {
        int first = 0, second = 1, next = 0;

        System.out.print("First Fibonacci numbers are: ");
        while (next < 21) {
            next = first + second;
            first = second;
            second = next;

            System.out.print(next + " ");
        }
    }
}
` },
  js: { name: "Java Script", code: "Write some JS here..." },
  kotlin: { name: "Kotlin", code: "Write some Kotlin here..." },
  python: { name: "Python", code: `def fibonacci(n):
  a, b = 0, 1
  for _ in range(n):
      a, b = b, a + b
  return a

print("The 5th Fibonacci number is:", fibonacci(5))
` },
  ts: { name: "Type Script", code: "Write some TS here..." },
  csharp: { name: "C#", code: "Write some C# here..." },

};
