import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

interface AlertOptions {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  timer?: number;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
}

interface ConfirmOptions {
  title: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  type?: 'warning' | 'danger' | 'info';
}

class AlertService {
  // Colores por defecto basados en tu paleta verde
  private static readonly colors = {
    success: '#16a34a',
    error: '#dc2626',
    warning: '#f59e0b',
    info: '#3b82f6',
    cancel: '#6b7280'
  };

  // Alerta de éxito
  static success(title: string, text?: string, timer: number = 2000): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: this.colors.success,
      timer,
      showConfirmButton: timer === 0
    });
  }

  // Alerta de error
  static error(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: this.colors.error
    });
  }

  // Alerta de advertencia
  static warning(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonColor: this.colors.warning
    });
  }

  // Alerta de información
  static info(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: this.colors.info
    });
  }

  // Confirmación de eliminación/desactivación (peligrosa)
  static confirmDelete(
    title: string = '¿Estás seguro?',
    text: string = 'Esta acción no se puede deshacer'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.colors.error,
      cancelButtonColor: this.colors.cancel,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  }

  // Confirmación de desactivación
  static confirmDeactivate(
    title: string = '¿Estás seguro?',
    text: string = 'Esta acción desactivará el elemento'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.colors.error,
      cancelButtonColor: this.colors.success,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    });
  }

  // Confirmación de activación
  static confirmActivate(
    title: string = '¿Confirmar activación?',
    text: string = 'Esta acción activará el elemento'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: this.colors.success,
      cancelButtonColor: this.colors.cancel,
      confirmButtonText: 'Sí, activar',
      cancelButtonText: 'Cancelar'
    });
  }

  // Confirmación genérica
  static confirm(options: ConfirmOptions): Promise<SweetAlertResult> {
    const colors = {
      warning: { confirm: this.colors.warning, cancel: this.colors.cancel },
      danger: { confirm: this.colors.error, cancel: this.colors.cancel },
      info: { confirm: this.colors.info, cancel: this.colors.cancel }
    };

    const selectedColors = colors[options.type || 'warning'];

    return Swal.fire({
      title: options.title,
      text: options.text,
      icon: options.type === 'danger' ? 'warning' : (options.type || 'question'),
      showCancelButton: true,
      confirmButtonColor: selectedColors.confirm,
      cancelButtonColor: selectedColors.cancel,
      confirmButtonText: options.confirmButtonText || 'Confirmar',
      cancelButtonText: options.cancelButtonText || 'Cancelar'
    });
  }

  // Alerta personalizada
  static custom(options: AlertOptions): Promise<SweetAlertResult> {
    return Swal.fire({
      title: options.title,
      text: options.text,
      icon: options.icon || 'info',
      confirmButtonText: options.confirmButtonText || 'OK',
      cancelButtonText: options.cancelButtonText || 'Cancelar',
      confirmButtonColor: options.confirmButtonColor || this.colors.success,
      cancelButtonColor: options.cancelButtonColor || this.colors.cancel,
      timer: options.timer,
      showConfirmButton: options.showConfirmButton !== false,
      showCancelButton: options.showCancelButton || false
    });
  }

  // Toast (notificación pequeña)
  static toast(
    title: string, 
    icon: SweetAlertIcon = 'success', 
    timer: number = 3000
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer,
      timerProgressBar: true
    });
  }
}

export default AlertService;