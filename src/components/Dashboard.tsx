import * as React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { 
  Search, Filter, FileText, MapPin, Clock, Shield, 
  TrendingUp, AlertTriangle, Database, Code, Info, 
  Download, Share2, MoreVertical, ChevronRight,
  Smartphone, Bike, Car, Briefcase, DollarSign, ShoppingBag,
  User, Zap, Navigation, Tag
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockCrimes, statsByZone, stolenObjectsRanking, mobilityData, mobilityMatrix } from '@/lib/mockData';
import { pythonImplementation } from '@/lib/pythonCode';

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6'];

const ObjectIcon = ({ objects }: { objects: string[] }) => {
  if (objects.includes('Celular')) return <Smartphone className="h-4 w-4" />;
  if (objects.includes('Bicicleta')) return <Bike className="h-4 w-4" />;
  if (objects.includes('Auto')) return <Car className="h-4 w-4" />;
  if (objects.includes('Billetera') || objects.includes('Dinero')) return <DollarSign className="h-4 w-4" />;
  if (objects.includes('Ropa')) return <ShoppingBag className="h-4 w-4" />;
  return <Briefcase className="h-4 w-4" />;
};

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCrimes = mockCrimes.filter(crime => 
    crime.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crime.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] text-[#1A1A1A] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A] text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">CrimeMiner AI</h1>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Análisis Criminal Local</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Buscar en denuncias..." 
                className="w-64 pl-9 bg-muted/50 border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="overview" className="flex flex-col space-y-6">
          <div className="flex items-center justify-between w-full">
            <TabsList className="bg-white border shadow-sm p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white">
                Vista General
              </TabsTrigger>
              <TabsTrigger value="text-mining" className="data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white">
                Minería de Texto
              </TabsTrigger>
              <TabsTrigger value="mobility" className="data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white">
                Análisis de Movilidad
              </TabsTrigger>
              <TabsTrigger value="implementation" className="data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white">
                Implementación Python
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Entorno Local Activo
            </div>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-1 bg-red-500" />
                  <CardHeader className="pb-2">
                    <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Total Denuncias</CardDescription>
                    <CardTitle className="text-3xl font-bold">1,284</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 text-xs text-red-500 font-bold">
                      <TrendingUp className="h-3 w-3" />
                      +12% vs mes anterior
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-1 bg-orange-500" />
                  <CardHeader className="pb-2">
                    <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Modus Operandi Crítico</CardDescription>
                    <CardTitle className="text-3xl font-bold">Arrebato</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 text-xs text-orange-500 font-bold">
                      <AlertTriangle className="h-3 w-3" />
                      Frecuencia: 42%
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-1 bg-blue-500" />
                  <CardHeader className="pb-2">
                    <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Zona de Riesgo</CardDescription>
                    <CardTitle className="text-3xl font-bold">Centro</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 text-xs text-blue-500 font-bold">
                      <MapPin className="h-3 w-3" />
                      Concentración: 35%
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-1 bg-purple-500" />
                  <CardHeader className="pb-2">
                    <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Objeto más Robado</CardDescription>
                    <CardTitle className="text-3xl font-bold">Celulares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 text-xs text-purple-500 font-bold">
                      <Smartphone className="h-3 w-3" />
                      Incidencia: Muy Alta
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Tag className="h-5 w-5 text-red-500" />
                    Ranking de Objetos Robados
                  </CardTitle>
                  <CardDescription>Frecuencia de bienes sustraídos identificados por minería de texto</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stolenObjectsRanking} layout="vertical" margin={{ left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: '#f8f9fa' }}
                      />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {stolenObjectsRanking.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    Delitos por Zona, Objetos y Marcas
                  </CardTitle>
                  <CardDescription>Correlación entre ubicación y características de los bienes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-b border-muted">
                        <TableHead className="font-bold text-xs uppercase tracking-wider">Zona</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider">Objetos</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider">Marcas Comunes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {statsByZone.map((zone) => (
                        <TableRow key={zone.name} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="font-medium">{zone.name}</TableCell>
                          <TableCell className="text-sm">{zone.objects}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {zone.brands.map(brand => (
                                <Badge key={brand.name} variant="outline" className="text-[10px] font-bold">
                                  {brand.name} ({brand.count})
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Text Mining Tab */}
          <TabsContent value="text-mining" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">Análisis de Texto de Denuncias</CardTitle>
                    <CardDescription>Extracción automática de entidades y modus operandi</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 border-none">NLP Activo</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {filteredCrimes.map((crime) => (
                        <div key={crime.id} className="group relative rounded-xl border p-4 hover:bg-muted/30 transition-all">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">
                                {crime.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {crime.date} {crime.time}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {crime.objects.map((obj, idx) => (
                                <div key={idx} className="flex flex-col items-end gap-1">
                                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[10px] border-none flex items-center gap-1">
                                    <ObjectIcon objects={[obj]} />
                                    {obj}
                                  </Badge>
                                  {crime.brands && crime.brands[idx] && (
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{crime.brands[idx]}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm font-medium leading-relaxed mb-3">
                            {crime.description}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px]">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="h-3 w-3" /> {crime.location} ({crime.zone})
                            </div>
                            <div className="flex items-center gap-1 font-bold text-orange-600">
                              <Shield className="h-3 w-3" /> MO: {crime.modusOperandi}
                            </div>
                            <div className="flex items-center gap-1 text-blue-600 font-bold">
                              <Zap className="h-3 w-3" /> Agresor: {crime.aggressorMobility}
                            </div>
                            <div className="flex items-center gap-1 text-green-600 font-bold">
                              <User className="h-3 w-3" /> Víctima: {crime.victimMobility}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest">Tópicos Emergentes (LDA)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Moto + Arrebato + Celular</span>
                        <span>45%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-[45%]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Escuela + Bicicleta + Día</span>
                        <span>28%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[28%]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Banco + Estafa + Teléfono</span>
                        <span>15%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[15%]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-[#1A1A1A] text-white">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest">Métricas de Patrón</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs opacity-70">Coherencia Semántica</span>
                      <span className="font-mono text-sm">0.84</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs opacity-70">Soporte de Patrón</span>
                      <span className="font-mono text-sm">124 obs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-70">Confianza del Modelo</span>
                      <span className="font-mono text-sm">92%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Mobility Tab */}
          <TabsContent value="mobility" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-purple-500" />
                    Comparativa de Movilidad
                  </CardTitle>
                  <CardDescription>Modo de transporte de agresores vs víctimas (%)</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mobilityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="type" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Legend />
                      <Bar dataKey="agresor" name="Agresor" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="victima" name="Víctima" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    Correlación de Movilidad
                  </CardTitle>
                  <CardDescription>Análisis de ventaja táctica por modo de escape</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-xl bg-muted/30 border">
                    <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Patrón Detectado: Moto vs A Pie
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      El 65% de los agresores utiliza motocicletas para el arrebato, mientras que el 45% de las víctimas se desplaza a pie. Esta disparidad de velocidad es el factor clave en la tasa de éxito del delito en la Zona A.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border">
                    <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      Movilidad Estática
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      En la Zona B, el 100% de los hurtos de bicicletas ocurren cuando la víctima ha dejado el vehículo estacionado. El agresor suele movilizarse a pie para no levantar sospechas antes del hecho.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Matriz de Interacción de Movilidad
                </CardTitle>
                <CardDescription>Frecuencia de encuentros según modo de transporte (Agresor vs Víctima)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {mobilityMatrix.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all hover:shadow-md"
                      style={{ 
                        backgroundColor: `rgba(239, 68, 68, ${item.intensity * 0.15})`,
                        borderColor: `rgba(239, 68, 68, ${item.intensity * 0.3})`
                      }}
                    >
                      <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1">
                        {item.aggressor} → {item.victim}
                      </div>
                      <div className="text-2xl font-bold text-[#1A1A1A]">
                        {item.count}
                      </div>
                      <div className="text-[10px] font-medium text-muted-foreground mt-1">
                        Casos Detectados
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="implementation" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Code className="h-5 w-5 text-blue-500" />
                      Implementación Python (Entorno Local)
                    </CardTitle>
                    <CardDescription>Código modular para procesamiento offline de denuncias</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(pythonImplementation)}>
                    Copiar Código
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl bg-[#1E1E1E] p-4 overflow-hidden">
                  <ScrollArea className="h-[600px]">
                    <pre className="text-xs font-mono text-blue-300 leading-relaxed">
                      {pythonImplementation}
                    </pre>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-none shadow-sm bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-blue-900">Recomendaciones de Política Pública</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-800 space-y-2">
                  <p>• <strong>Patrullaje Dinámico:</strong> Desplegar unidades en Zona A durante el horario 20:00-00:00 basándose en la alta incidencia de arrebatos.</p>
                  <p>• <strong>Prevención Comunitaria:</strong> Campañas específicas sobre estafas telefónicas dirigidas a adultos mayores en zonas residenciales.</p>
                  <p>• <strong>Infraestructura:</strong> Mejorar iluminación y cámaras en cercanías de escuelas donde se detectó patrón de hurto de bicicletas.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-green-50">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-green-900">Métricas de Evaluación</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-green-800 space-y-2">
                  <p>• <strong>Recall de Entidades:</strong> Capacidad del sistema para identificar todos los objetos robados mencionados.</p>
                  <p>• <strong>Precisión de Clustering:</strong> Verificación manual de que los delitos agrupados realmente comparten modus operandi.</p>
                  <p>• <strong>Tasa de Acción:</strong> Porcentaje de patrones detectados que resultaron en una intervención policial efectiva.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
