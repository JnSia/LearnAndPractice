N, M = map(int, input().split())
A = sorted(list(map(int, input().split())))
B = sorted(list(map(int, input().split())))

A_time = A[0]
B_time = B[0]

A_cnt = 1
B_cnt = 1

for idx in range(1, N):
    if A[idx] >= A_time + 100:                                                  
        A_cnt += 1
        A_time = A[idx]

for idx in range(1, M):
    if B[idx] >= B_time + 360:
        B_cnt += 1
        B_time = B[idx]

print(A_cnt, B_cnt)