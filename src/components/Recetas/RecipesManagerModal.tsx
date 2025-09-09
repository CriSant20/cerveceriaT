import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiSave,
  FiRotateCcw,
  FiRefreshCcw,
} from "react-icons/fi";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

type Ingred = {
  ingrediente_id?: number | null; // 👈 nuevo
  nombre: string;
  cantidad: number;
};

type OptionItem = { id: number; nombre: string }; // 👈 para los combos

type TipoKey = "maltas" | "lupulos" | "levaduras";
const apiLabelByKey: Record<TipoKey, string> = {
  maltas: "Maltas",
  lupulos: "Lúpulos",
  levaduras: "Levaduras",
};

type RecetaLite = {
  id: number;
  nombre_receta: string;
  estilo?: string;
  porcentaje_alcohol?: number;
  contenido_neto?: number;
  ibu?: number;
  descripcion?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAnyChange?: () => void;
};

const tipoLabels: Record<TipoKey, string> = {
  maltas: "Maltas",
  lupulos: "Lúpulos",
  levaduras: "Levaduras",
};

// === Tipos para opciones de ingredientes ===
type UnidadAPI = {
  id: number;
  nombre: string; // "kg"
};

type TipoIngredienteAPI = {
  id: number; // 1|2|3
  nombre_tipo: string; // "Maltas" | "Lúpulos" | "Levaduras"
};

type IngredienteAPI = {
  id: number;
  nombre_ingrediente: string;
  stock: string; // viene como "300.000"
  unidad: UnidadAPI;
  tipo: TipoIngredienteAPI;
};

export default function RecipesManagerModal({
  isOpen,
  onClose,
  onAnyChange,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<RecetaLite[]>([]);
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Formulario (crear/editar)
  const [nombre, setNombre] = useState("");
  const [estilo, setEstilo] = useState("");
  const [abv, setAbv] = useState<string>("");
  const [volumen, setVolumen] = useState<string>("");
  const [ibu, setIbu] = useState<string>("");
  const [descripcion, setDescripcion] = useState("");
  const [maltas, setMaltas] = useState<Ingred[]>([{ nombre: "", cantidad: 0 }]);
  const [lupulos, setLupulos] = useState<Ingred[]>([
    { nombre: "", cantidad: 0 },
  ]);
  const [levaduras, setLevaduras] = useState<Ingred[]>([
    { nombre: "", cantidad: 0 },
  ]);

  // === Opciones para los combobox (por tipo) ===
  const [optionsByType, setOptionsByType] = useState<
    Record<TipoKey, OptionItem[]>
  >({
    maltas: [],
    lupulos: [],
    levaduras: [],
  });

  const [loadingOptions, setLoadingOptions] = useState<
    Record<TipoKey, boolean>
  >({
    maltas: false,
    lupulos: false,
    levaduras: false,
  });

  const resetForm = () => {
    setEditingId(null);
    setNombre("");
    setEstilo("");
    setAbv("");
    setVolumen("");
    setIbu("");
    setDescripcion("");
    setMaltas([{ nombre: "", cantidad: 0 }]);
    setLupulos([{ nombre: "", cantidad: 0 }]);
    setLevaduras([{ nombre: "", cantidad: 0 }]);
  };

  const norm = (s: string) => s.trim().toLowerCase();
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();

  const filtered = useMemo(() => {
    const f = norm(filter);
    if (!f) return items;
    return items.filter(
      (r) =>
        norm(r.nombre_receta).includes(f) || norm(r.estilo ?? "").includes(f)
    );
  }, [items, filter]);

  // === Cargar recetas “lite” ===
  const loadRecetas = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/recetas/`);
      const mapped: RecetaLite[] = (data ?? []).map((r: any) => ({
        id: r.id,
        nombre_receta: r.nombre_receta ?? r.nombre ?? "",
        estilo: r.estilo ?? r.nombre_receta,
        porcentaje_alcohol: r.porcentaje_alcohol ?? r.abv ?? 0,
        contenido_neto: r.contenido_neto ?? r.volumen ?? 0,
        ibu: r.ibu ?? 0,
        descripcion: r.descripcion ?? "",
      }));
      setItems(mapped);
    } catch (e) {
      console.error(e);
      toast.error("No se pudieron cargar las recetas");
    } finally {
      setLoading(false);
    }
  };

  // === Cargar opciones por tipo (con fallback) ===
  const fetchOptionsForType = async (tipo: TipoKey) => {
    setLoadingOptions((p) => ({ ...p, [tipo]: true }));
    try {
      const { data } = await axios.get<IngredienteAPI[]>(
        `${API_URL}/ingredientes/`
      );
      const wanted = normalize(apiLabelByKey[tipo]); // "maltas" | "lupulos" | "levaduras"

      const filtered = (Array.isArray(data) ? data : []).filter((x) => {
        const t = x?.tipo?.nombre_tipo ?? "";
        return normalize(t) === wanted;
      });

      const items: OptionItem[] = filtered
        .map((x) => ({
          id: x.id,
          nombre: (x?.nombre_ingrediente ?? "").trim(),
        }))
        .filter((it) => it.nombre);

      items.sort((a, b) => a.nombre.localeCompare(b.nombre));

      setOptionsByType((prev) => ({ ...prev, [tipo]: items }));
    } catch (e) {
      console.error(e);
      toast.error(`No se pudieron cargar ingredientes de ${tipoLabels[tipo]}`);
    } finally {
      setLoadingOptions((p) => ({ ...p, [tipo]: false }));
    }
  };

  const fetchAllOptions = async () => {
    await Promise.all(
      ["maltas", "lupulos", "levaduras"].map((t) =>
        fetchOptionsForType(t as TipoKey)
      )
    );
  };

  useEffect(() => {
    if (isOpen) {
      loadRecetas();
      fetchAllOptions(); // Carga las opciones al abrir el modal
    }
  }, [isOpen]);

  // Helpers ingredientes
  const addRow = (tipo: TipoKey) => {
    const setter = {
      maltas: setMaltas,
      lupulos: setLupulos,
      levaduras: setLevaduras,
    }[tipo];
    const curr = { maltas, lupulos, levaduras }[tipo];
    setter([...curr, { nombre: "", cantidad: 0 }]);
  };
  const removeRow = (tipo: TipoKey, idx: number) => {
    const setter = {
      maltas: setMaltas,
      lupulos: setLupulos,
      levaduras: setLevaduras,
    }[tipo];
    const curr = { maltas, lupulos, levaduras }[tipo];
    if (curr.length === 1) return setter([{ nombre: "", cantidad: 0 }]);
    setter(curr.filter((_, i) => i !== idx));
  };
  const updateRow = (tipo: TipoKey, idx: number, patch: Partial<Ingred>) => {
    const setter = {
      maltas: setMaltas,
      lupulos: setLupulos,
      levaduras: setLevaduras,
    }[tipo];
    const curr = { maltas, lupulos, levaduras }[tipo];
    setter(curr.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  };

  // Cargar una receta para editar (detallada si lo necesitas)
  const startEdit = async (rec: RecetaLite) => {
    try {
      setEditingId(rec.id);

      // Campos básicos desde la fila "lite"
      setNombre(rec.nombre_receta);
      setEstilo(rec.estilo ?? "");
      setAbv(String(rec.porcentaje_alcohol ?? ""));
      setVolumen(String(rec.contenido_neto ?? ""));
      setIbu(String(rec.ibu ?? ""));
      setDescripcion(rec.descripcion ?? "");

      // Asegura opciones de datalist cargadas
      if (
        optionsByType.maltas.length === 0 ||
        optionsByType.lupulos.length === 0 ||
        optionsByType.levaduras.length === 0
      ) {
        await fetchAllOptions();
      }

      // 👇 Ahora el retrieve de /recetas/:id trae "tipos"
      const { data } = await axios.get(`${API_URL}/recetas/${rec.id}/`);

      const getTipo = (name: string) =>
        (data?.tipos || []).find((t: any) => t?.nombre_tipo === name)
          ?.ingredientes ?? [];

      const maltasSrv = getTipo("Maltas");
      const lupulosSrv = getTipo("Lúpulos");
      const levadurasSrv = getTipo("Levaduras");

      const toRows = (arr: any[]) =>
        arr.map((x) => ({
          ingrediente_id: x?.id ?? null, // 👈 ID REAL del Ingrediente
          nombre: x?.nombre_ingrediente ?? "",
          cantidad: Number(String(x?.cantidad ?? "0").replace(",", ".")) || 0,
        }));

      setMaltas(
        maltasSrv.length ? toRows(maltasSrv) : [{ nombre: "", cantidad: 0 }]
      );
      setLupulos(
        lupulosSrv.length ? toRows(lupulosSrv) : [{ nombre: "", cantidad: 0 }]
      );
      setLevaduras(
        levadurasSrv.length
          ? toRows(levadurasSrv)
          : [{ nombre: "", cantidad: 0 }]
      );
    } catch (e) {
      console.error(e);
      toast.error("No se pudo cargar la receta para edición");
      resetForm();
    }
  };
  const buildPayload = () => {
    const toNum = (s: string) => Number((s || "").replace(",", "."));

    const gather = (arr: Ingred[]) =>
      arr
        .filter((x) => x.nombre.trim() && (x.ingrediente_id ?? null) !== null)
        .map((x) => ({
          ingrediente_id: Number(x.ingrediente_id),
          cantidad: Number(x.cantidad) || 0,
        }));

    const ingredientes = [
      ...gather(maltas),
      ...gather(lupulos),
      ...gather(levaduras),
    ];

    return {
      nombre_receta: nombre.trim(),
      descripcion: descripcion.trim() || undefined,
      porcentaje_alcohol: isNaN(toNum(abv)) ? undefined : toNum(abv),
      contenido_neto: isNaN(toNum(volumen)) ? undefined : toNum(volumen),
      ingredientes, // 👈 lo que espera el backend
    };
  };

  const handleCreateOrUpdate = async () => {
    if (!nombre.trim())
      return toast.error("El nombre de la receta es obligatorio");
    setSaving(true);
    try {
      const payload = buildPayload();

      if (editingId) {
        console.log("PUT", payload);
        await axios.put(
          `${API_URL}/recetas/${editingId}/editar-con-ingredientes/`,
          payload
        );
        toast.success("Receta actualizada");
      } else {
        console.log("POST", payload);
        await axios.post(`${API_URL}/recetas/crear-con-ingredientes/`, payload);
        toast.success("Receta creada");
      }

      await loadRecetas(); // refresca panel izquierdo
      onAnyChange?.(); // para padre (vuelve a cargar el selector)
      resetForm();
    } catch (e: any) {
      console.error(e);
      toast.error(e?.response?.data?.detail || "No se pudo guardar la receta");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta receta?")) return;
    try {
      await axios.delete(`${API_URL}/recetas/${id}/`);
      toast.success("Receta eliminada");
      await loadRecetas();
      onAnyChange?.();
      if (editingId === id) resetForm();
    } catch (e) {
      console.error(e);
      toast.error("No se pudo eliminar la receta");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipes-manager-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-6xl rounded-xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Panel izquierdo: listado */}
        <div className="md:w-5/12 border-r">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 id="recipes-manager-title" className="text-lg font-semibold">
              Gestionar Recetas
            </h2>
            <button
              onClick={onClose}
              className="rounded p-2 hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <FiX />
            </button>
          </div>

          <div className="p-4">
            <div className="mb-3">
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                placeholder="Buscar por nombre o estilo..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-500">
                {filtered.length} recetas
              </div>
              <button
                onClick={resetForm}
                className="flex items-center gap-2 text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                title="Nueva receta"
              >
                <FiPlus /> Nueva
              </button>
            </div>

            <div className="max-h-[60vh] overflow-auto divide-y">
              {loading ? (
                <div className="p-4 text-gray-500">Cargando...</div>
              ) : filtered.length === 0 ? (
                <div className="p-4 text-gray-500">Sin resultados</div>
              ) : (
                filtered.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <div className="font-medium truncate">
                        {r.nombre_receta}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {r.estilo ?? "—"} · ABV {r.porcentaje_alcohol ?? 0}% ·
                        IBU {r.ibu ?? 0} · Vol {r.contenido_neto ?? 0}L
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(r)}
                        className="rounded p-2 text-amber-600 hover:bg-amber-50"
                        aria-label="Editar"
                        title="Editar"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="rounded p-2 text-red-600 hover:bg-red-50"
                        aria-label="Eliminar"
                        title="Eliminar"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Panel derecho: formulario */}
        <div className="md:w-7/12">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="font-semibold">
              {editingId ? `Editar receta #${editingId}` : "Nueva receta"}
            </div>
            <button
              onClick={resetForm}
              className="flex items-center gap-2 text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
              title="Limpiar formulario"
            >
              <FiRotateCcw /> Limpiar
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-[70vh] overflow-auto">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="Ej. IPA Cítrica"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estilo
                </label>
                <input
                  value={estilo}
                  onChange={(e) => setEstilo(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="Ej. American IPA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ABV (%)
                </label>
                <input
                  value={abv}
                  onChange={(e) => setAbv(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="5.4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IBU
                </label>
                <input
                  value={ibu}
                  onChange={(e) => setIbu(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="35"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volumen (L)
                </label>
                <input
                  value={volumen}
                  onChange={(e) => setVolumen(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                placeholder="Notas de cata, proceso, etc."
              />
            </div>

            {/* Ingredientes por tipo (con COMBOBOX) */}
            {(["maltas", "lupulos", "levaduras"] as TipoKey[]).map((tipo) => {
              const arr = { maltas, lupulos, levaduras }[tipo];
              const options = optionsByType[tipo];
              return (
                <div key={tipo} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{tipoLabels[tipo]}</div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addRow(tipo)}
                        className="text-sm px-2 py-1 rounded bg-amber-600 text-white hover:bg-amber-700"
                      >
                        <FiPlus className="inline mr-1" /> Agregar{" "}
                        {tipo.slice(0, -1)}
                      </button>
                      <button
                        type="button"
                        onClick={() => fetchOptionsForType(tipo)}
                        className="text-sm px-2 py-1 rounded border border-amber-300 text-amber-700 hover:bg-amber-50"
                        title={`Recargar ${tipoLabels[tipo]}`}
                        disabled={loadingOptions[tipo]}
                      >
                        <FiRefreshCcw
                          className={`inline mr-1 ${
                            loadingOptions[tipo] ? "animate-spin" : ""
                          }`}
                        />
                        {loadingOptions[tipo] ? "Cargando..." : "Recargar"}
                      </button>
                    </div>
                  </div>

                  {/* Datalist para el combobox de este tipo */}
                  <datalist id={`dl-${tipo}`}>
                    {options.map((opt) => (
                      <option key={opt.id} value={opt.nombre} />
                    ))}
                  </datalist>

                  <div className="space-y-2">
                    {arr.map((it, i) => (
                      <div
                        key={`${tipo}-${i}`}
                        className="grid grid-cols-12 gap-2"
                      >
                        {/* COMBOBOX: input asociado a datalist */}
                        <input
                          list={`dl-${tipo}`}
                          className="col-span-7 rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                          placeholder={`Selecciona ${tipo.slice(0, -1)}...`}
                          value={it.nombre}
                          onChange={(e) => {
                            const newName = e.target.value;
                            const match = options.find(
                              (o) => o.nombre === newName
                            );
                            updateRow(tipo, i, {
                              nombre: newName,
                              ingrediente_id: match ? match.id : null, // 👈 set id si coincide
                            });
                          }}
                        />

                        <datalist id={`dl-${tipo}`}>
                          {options.map((opt) => (
                            <option key={opt.id} value={opt.nombre} />
                          ))}
                        </datalist>

                        <input
                          className="col-span-4 rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                          placeholder="Cantidad"
                          inputMode="decimal"
                          value={String(it.cantidad)}
                          onChange={(e) =>
                            updateRow(tipo, i, {
                              cantidad:
                                Number(
                                  (e.target.value || "").replace(",", ".")
                                ) || 0,
                            })
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeRow(tipo, i)}
                          className="col-span-1 rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
                          title="Quitar"
                        >
                          <FiTrash2 className="mx-auto" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cerrar
            </button>
            <button
              onClick={handleCreateOrUpdate}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700 disabled:opacity-60"
            >
              <FiSave /> {editingId ? "Guardar cambios" : "Crear receta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
