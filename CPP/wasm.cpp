#include <algorithm>
#include <emscripten/bind.h>
#include <numeric>
#include <stdio.h>
#include <vector>

using namespace std;

int nrOfPrimes(int limit) {

  vector<int> primeNumbers(limit);
  iota(primeNumbers.begin(), primeNumbers.end(), 0);
  primeNumbers[0] = -1;
  primeNumbers[1] = -1;
  for (auto prime : primeNumbers) {
    if (prime == -1) {
      continue;
    }
    for (long int i = prime * prime; i < limit; i += prime) {
      if (i % prime == 0) {
        primeNumbers[i] = -1;
      }
    }
  }

  return count_if(primeNumbers.begin(), primeNumbers.end(),
                  [](int i) { return i != -1; });
}

using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_module) {
  emscripten::function("nrOfPrimes", &nrOfPrimes);
}