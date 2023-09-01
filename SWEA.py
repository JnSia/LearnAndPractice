def bfs(sx, sy):
    queue = [(sx, sy)]
    res = 1
    time = 0

    while queue and time < L - 1:
        time += 1

        for _ in range(len(queue)):
            x, y = queue.pop(0)
            num = matrix[x][y]
            
            for dx, dy in tunnel[num]:
                nx = x + dx
                ny = y + dy

                if 0 <= nx < N and 0 <= ny < M and visited[nx][ny] == False:
                    next_num = matrix[nx][ny]

                    if next_num and (-dx, -dy) in tunnel[next_num]:
                        queue.append((nx, ny))
                        visited[nx][ny] = True
                        res += 1

    print(res)


tunnel = {
    1: [(-1, 0), (0, -1), (1, 0), (0, 1)],
    2: [(-1, 0), (1, 0)],
    3: [(0, -1), (0, 1)],
    4: [(-1, 0), (0, 1)],
    5: [(1, 0), (0, 1)],
    6: [(0, -1), (1, 0)],
    7: [(-1, 0), (0, -1)]
}

T = int(input())

for tc in range(1, T + 1):
    print(f'#{tc}', end=" ")
    N, M, R, C, L = map(int, input().split())
    visited = [[False for _ in range(M)] for _ in range(N)]
    matrix = [list(map(int, input().split())) for _ in range(N)]
    visited[R][C] = True
    bfs(R, C)