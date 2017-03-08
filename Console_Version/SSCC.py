def reading_the_graph_as_adjacent_matrix():
    q_vertex, q_edge = [int(x) for x in input().split()] 
    graph = [[0]* q_vertex for i in range(q_vertex)]
    for edge in range(q_edge):
        v1, v2 = [int(x) for x in input().split()]
        graph[v1][v2] = 1
    return graph


def first_dfs(vertex, graph):
    used.add(vertex)
    for v in range(len(graph)):   
        if graph[vertex][v] == 1 and v not in used:   
            first_dfs(v, graph)
    list_vector.append(vertex)

    
def second_dfs(vertex, graph_t):
    used.add(vertex)
    for v in list_vector:   
        if graph_t[vertex][v] == 1 and v not in used:   
            second_dfs(v, graph_t)
    list_components.append(vertex)

    		                 
def reverse_graph(graph):
    graph_t = list(zip(*graph))
    return graph_t
				
			
#MAIN

#read the graph
graph = reading_the_graph_as_adjacent_matrix()

#set of visited vertices
used = set()

#call first depth-first search
list_vector = [] #vertices in topological sorted order
for vertex in range(len(graph)):
   if vertex not in used:
      first_dfs(vertex, graph)              
list_vector.reverse()

#preparation for calling second depth-first search
graph_t = reverse_graph(graph)
used = set()

#call second depth-first search
list_components = [] #strong-connected components
scc_quantity = 0 #quantity of strong-connected components 
for vertex in list_vector:
    if vertex not in used:
        scc_quantity += 1
        list_components = []
        second_dfs(vertex, graph_t)
        print(list_components)
print(scc_quantity)
    
