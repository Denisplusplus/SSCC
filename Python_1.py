def reading_the_graph_as_adjacent_matrix():
    q_vertex, q_edge = [int(x) for x in input().split()] 
    graph = [[0]* q_vertex for i in range(q_vertex)]
    for edge in range(q_edge):
        v1, v2 = [int(x) for x in input().split()]
        graph[v1][v2] = 1
    return graph


def dfs(vertex, graph, used=set()):
    used.add(vertex)
    for v in range(len(graph)):
        if graph[vertex][v] == 1 and v not in used:
            #print(v)
            dfs(v, graph)
            #print(v)
			
#def print_graph(A):
#    for line in A:
#        print(*line)
#    print()			
                 
def reverse_graph(graph):
    graph_t = list(zip(*graph))
    return graph_t
				
			
				 
graph = reading_the_graph_as_adjacent_matrix()
#print_graph(graph)
#dfs(0, graph)
#graph1 = reverse_graph(graph)
#print_graph(graph1)
#print_graph(graph)
