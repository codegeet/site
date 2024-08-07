
export const languages: { [languageId: string]: { name: string; code: string } } = {
  java: {
    name: "Java", code: `public class Main {

    public static void main(String[] args) {
        int[] arr = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 };
        int target = 11;

        int result = binarySearch(arr, target);

        System.out.println("Index of " + target + " is " + result);
    }

    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;

        while (left <= right) {
            int mid = (left + right) / 2;

            if (arr[mid] == target)
                return mid;
            else if (arr[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }

        return -1;
    }
}
` },
  js: {
    name: "Java Script", code: `
  const arr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const target = 11;
  
  function binarySearch(arr, target) {
      let left = 0;
      let right = arr.length - 1;
  
      while (left <= right) {
          let mid = Math.floor((left + right) / 2);
  
          if (arr[mid] === target) {
              return mid;
          } else if (arr[mid] < target) {
              left = mid + 1;
          } else {
              right = mid - 1;
          }
      }
  
      return -1; // Target not found
  }
  
  const result = binarySearch(arr, target);
  
  console.log(\`Index of \${target} is\`, result);
  `},
  kotlin: {
    name: "Kotlin", code: `fun main() {
    val arr = intArrayOf(2, 3, 5, 7, 11, 13, 17, 19, 23, 29)
    val target = 11

    val result = binarySearch(arr, target)

    println("Index of $target is $result")
}

fun binarySearch(arr: IntArray, target: Int): Int {
    var left = 0
    var right = arr.size - 1

    while (left <= right) {
        val mid = (left + right) / 2

        when {
            arr[mid] == target -> return mid
            arr[mid] < target -> left = mid + 1
            else -> right = mid - 1
        }
    }

    return -1
}` },
  python: {
    name: "Python", code: `arr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
target = 11
      
def binary_search(arr, target):
  left, right = 0, len(arr) - 1
      
  while left <= right:
    mid = (left + right) // 2
      
    if arr[mid] == target:
      return mid
    elif arr[mid] < target:
      left = mid + 1
    else:
      right = mid - 1
      
    return -1  # Target not found
      
result = binary_search(arr, target)
print(f"Index of {target} is {result}") ` },
  ts: {
    name: "Type Script", code: `const arr: number[] = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const target: number = 11;
  
  function binarySearch(arr: number[], target: number): number {
      let left: number = 0;
      let right: number = arr.length - 1;
  
      while (left <= right) {
          let mid: number = Math.floor((left + right) / 2);
  
          if (arr[mid] === target) {
              return mid;
          } else if (arr[mid] < target) {
              left = mid + 1;
          } else {
              right = mid - 1;
          }
      }
  
      return -1; // Target not found
  }
  
  const result: number = binarySearch(arr, target);
  
  console.log(\`Index of \${target} is\`, result);` },
  csharp: {
    name: "C#", code: `using System;

  class Program
  {
      static void Main()
      {
          int[] arr = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 };
          int target = 11;
          int result = BinarySearch(arr, target);
          Console.WriteLine($"Index of {target}: {result}");
      }
  
      static int BinarySearch(int[] arr, int target)
      {
          int left = 0, right = arr.Length - 1;
  
          while (left <= right)
          {
              int mid = (left + right) / 2;
  
              if (arr[mid] == target)
                  return mid;
              else if (arr[mid] < target)
                  left = mid + 1;
              else
                  right = mid - 1;
          }
  
          return -1; 
      }
  }` },
  onescript: {
    name: "One Script", code: `Функция БинарныйПоиск(МассивЧисел, Цель)
    Левый = 0;
    Правый = МассивЧисел.Количество() - 1;

    Пока Левый <= Правый Цикл
        Средний = Цел(Левый + (Правый - Левый) / 2);

        Если МассивЧисел[Средний] = Цель Тогда
            Возврат Средний;
        ИначеЕсли МассивЧисел[Средний] < Цель Тогда
            Левый = Средний + 1;
        Иначе
            Правый = Средний - 1;
        КонецЕсли;
    КонецЦикла;

    Возврат -1; // Цель не найдена
КонецФункции

МассивЧисел = Новый Массив;
МассивЧисел.Добавить(2);
МассивЧисел.Добавить(3);
МассивЧисел.Добавить(5);
МассивЧисел.Добавить(7);
МассивЧисел.Добавить(11);
МассивЧисел.Добавить(13);
МассивЧисел.Добавить(17);
МассивЧисел.Добавить(19);
МассивЧисел.Добавить(23);
МассивЧисел.Добавить(29);

Цель = 11;

Результат = БинарныйПоиск(МассивЧисел, Цель);

Сообщить("Индекс " + Строка(Цель) + " равен " + Строка(Результат));
` },
};
