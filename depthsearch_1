def reading_the_graph():
    q_vertex, q_edge = [int(x) for x in input().split()] 
    graph = [[0]* q_vertex for i in range(q_vertex)]
    for edge in range(q_edge):
        v1, v2 = [int(x) for x in input().split()]
        graph[v1][v2] = 1
    return graph

def print_graph(A):
    for line in A:
        print(*line)
    print()



def dfs(vertex, graph, used=set()):
    used.add(vertex)
    for i in range(len(graph)):
        for j in range(len(graph[i])):
            print(i , j)
            if i not in used:
                print(i, 'был позван на праздник')
                print("...")
                dfs(i, graph, used)
                print("...")
                print(i, 'пошел на праздник')
    
graph = reading_the_graph()
print_graph(graph)
dfs(0, graph)
