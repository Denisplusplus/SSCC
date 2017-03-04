def reading_the_graph():
    q_vertex, q_edge = [int(x) for x in input().split()] 
    graph = [[0]* q_vertex for i in range(q_vertex)]
    for edge in range(q_edge):
        v1, v2 = [int(x) for x in input().split()]
        graph[v1][v2] = 1
        graph[v2][v1] = 1
    return graph


def dfs(vertex, graph, used=set()):

    used.add(vertex)
    for v in range(len(graph)):
        if graph[vertex][v] == 1 and v not in used:
            print(v)
            dfs(i, graph)
            print(v)
                 
                
graph = reading_the_graph()
print_graph(graph)
dfs(0, graph)
