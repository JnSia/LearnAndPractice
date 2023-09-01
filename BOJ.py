import sys
input = sys.stdin.readline

N, K = map(int, input().split())
dp = [0 for _ in range(10001)]
dp[0] = 1

for n in range(N):
    coin = int(input())

    for idx in range(coin, K + 1):
        dp[idx] += dp[idx - coin]

print(dp[K])